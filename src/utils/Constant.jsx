import { AiFillDashboard } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUserAlt } from "react-icons/fa";

export const Menu = [
  { title: "Dashboard", path: "/", icon: <AiFillDashboard /> },
  {
    title: "Categoroies",
    path: "/categories",
    spacing: true,
    icon: <RxDashboard />,
  },
  {
    title: "Media Management",
    icon: <FaRegImages />,
    spacing: true,
    subMenu: true,
    subMenuItems: [
      { title: "Movie", path: "/media-management/movie" },
      { title: "Espisode", path: "/media-management/episode" },
      { title: "Trailer", path: "/media-management/trailer" },
    ],
  },
  {
    title: "Vip",
    icon: <FaStar />,
    subMenu: true,
    subMenuItems: [
      { title: "Package", path: "/vip/package" },
      { title: "Feature", path: "/vip/feature" },
      { title: "Plans", path: "/vip/plans" },
    ],
  },
  {
    title: "Cast & Crew",
    icon: <ImUsers />,
    subMenu: true,
    subMenuItems: [
      { title: "Author", path: "/cast-crew/author" },
      { title: "Character", path: "/cast-crew/character" },
      { title: "Actor", path: "/cast-crew/actor" },
    ],
  },
  {
    title: "Engagement Pages",
    icon: <BiSolidMessageSquareDetail />,
    subMenu: true,
    subMenuItems: [
      { title: "Like", path: "/engagement/like" },
      { title: "Watch List", path: "/engagement/watch-list" },
      { title: "Comment", path: "/engagement/comment" },
    ],
  },
  {
    title: "User Page",
    path: "/user",
    spacing: true,
    icon: <HiMiniUserGroup />,
  },
  { title: "Profile", path: "/profile", spacing: true, icon: <FaUserAlt /> },
];

export const imgPreview = "https://preyash2047.github.io/assets/img/no-preview-available.png?h=824917b166935ea4772542bec6e8f636";