import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "../config/CloudinaryConfig";
import { db, storage } from "../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

// Add a new document to a Firestore collection with optional image upload
export const addDocument = async (collectionName, values) => {
  try {
    if (values.imgUrl) {
      const imgUrl = await uploadImageToCloudinary(
        values.imgUrl,
        collectionName
      );
      values.imgUrl = imgUrl;
    }
    await addDoc(collection(db, collectionName), values);
  } catch (error) {
    console.error("Error adding document:", error);
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
  if (imgUrl && imgUrl.includes("cloudinary.com")) {
    const publicId = imgUrl
      .split("/")
      .slice(-2)
      .join("/") // Get folder and file name
      .replace(/\.[^/.]+$/, ""); // Remove file extension
    await deleteImageFromCloudinary(publicId);
  }

  // Delete the document from Firestore
  await deleteDoc(doc(collection(db, collectionName), docId));
};

// Update a document in a given collection with an optional image upload
export const updateDocument = async (collectionName, values, oldImgUrl) => {
  if (values.imgUrl) {
    const imgUrl = await uploadImageToCloudinary(values.imgUrl, collectionName);
    values.imgUrl = imgUrl;

    // Xóa ảnh trên Cloudinary nếu tồn tại
    if (oldImgUrl && oldImgUrl.includes("cloudinary.com")) {
      // Lấy `public_id` từ URL của Cloudinary
      const publicId = oldImgUrl
        .split("/")
        .slice(-2)
        .join("/") // Lấy thư mục và tên file từ URL
        .replace(/\.[^/.]+$/, ""); // Loại bỏ phần mở rộng file (ví dụ: .jpg, .png)
      await deleteImageFromCloudinary(publicId);
    }
  }
  await updateDoc(doc(collection(db, collectionName), values.id), values);
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
