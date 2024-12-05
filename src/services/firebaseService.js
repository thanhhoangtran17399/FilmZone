import { 
  collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, where, setDoc, getDoc 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "../config/CloudinaryConfig";
import { db, storage } from "../config/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

// Add a new document to a Firestore collection with optional image upload
export const addDocument = async (collectionName, values) => {
  try {
    if (values.imgUrl) {
      const imgUrl = await uploadImageToCloudinary(values.imgUrl, collectionName);
      values.imgUrl = imgUrl;
    }
    await addDoc(collection(db, collectionName), values);
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Fetch documents in real-time from a Firestore collection
export const fetchDocumentsRealtime = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    callback(documents);
  });

  return unsubscribe;
};

// Delete a document from Firestore and optionally remove its image from Cloudinary
export const deleteDocument = async (collectionName, docId, imgUrl) => {
  if (!docId) {
    throw new Error("Document ID is required for deletion");
  }

  // Delete the image from Cloudinary if it exists
  if (imgUrl && imgUrl.includes('cloudinary.com')) {
    const publicId = imgUrl
      .split('/').slice(-2).join('/')  // Get folder and file name
      .replace(/\.[^/.]+$/, '');       // Remove file extension
    await deleteImageFromCloudinary(publicId);
  }

  // Delete the document from Firestore
  await deleteDoc(doc(collection(db, collectionName), docId));
};

// Update a Firestore document with optional image handling
export const updateDocument = async (collectionName, values, imgUpload, oldImgUrl) => {
  const { id, ...updatedValues } = values;

  if (imgUpload) {
    const storageRef = ref(storage, `${collectionName}/${uuidv4()}`);
    await uploadBytes(storageRef, imgUpload);
    const imgUrl = await getDownloadURL(storageRef);
    updatedValues.imgUrl = imgUrl;

    // Delete the old image if it exists
    if (oldImgUrl) {
      const oldFilename = oldImgUrl.split('%2F').pop().split('?').shift();
      const oldImgRef = ref(storage, `${collectionName}/${oldFilename}`);
      await deleteObject(oldImgRef);
    }
  }

  await updateDoc(doc(collection(db, collectionName), id), updatedValues);
};

// Handle file input changes and set image data URL
export const handleFileChange = (event, setObject, object) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setObject({ ...object, imgUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }
};