import React, { Component } from "react";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Categories from "../pages/admin/categories/Categories";
import Feature from "../pages/admin/vip/Feature/Feature";
import Package from "../pages/admin/vip/Package/Package";
import Plans from "../pages/admin/vip/Plans/Plans";
import Movie from "../pages/admin/media_management/movie/Movie";
import Episode from "../pages/admin/media_management/episode/Episode";
import Trailer from "../pages/admin/media_management/trailer/Trailer";
import Author from "../pages/admin/cast_crew/author/Author";
import Actor from "../pages/admin/cast_crew/Actor/Actor";
import Comment from "../pages/admin/engagement_pages/comment/Comment";
import User from "../pages/admin/uses_pages/User";
import Profile from "../pages/admin/profile/Profile";
import WatchList from "../pages/admin/engagement_pages/watchList/WatchList";
import Like from "../pages/admin/engagement_pages/like/Like";
import { Route, Routes } from "react-router-dom";
import Character from "../pages/admin/cast_crew/character/Character";
function AdminRouters(props) {
  const routes = [
    {
      path: "/",
      Component: <Dashboard />,
    },
    {
      path: "/categories",
      Component: <Categories />,
    },
    {
      path: "/vip/package",
      Component: <Package />,
    },
    {
      path: "/vip/feature",
      Component: <Feature />,
    },
    {
      path: "/vip/plans",
      Component: <Plans />,
    },
    {
      path: "/media-management/movie",
      Component: <Movie />,
    },
    {
      path: "/media-management/episode",
      Component: <Episode />,
    },
    {
      path: "/media-management/trailer",
      Component: <Trailer />,
    },
    {
      path: "/cast-crew/author",
      Component: <Author />,
    },
    {
      path: "/cast-crew/actor",
      Component: <Actor />,
    },
    {
      path: "/cast-crew/character",
      Component: <Character />,
    },
    {
      path: "/engagement/like",
      Component: <Like />,
    },
    {
      path: "/engagement/watch-list",
      Component: <WatchList />,
    },
    {
      path: "/engagement/comment",
      Component: <Comment />,
    },
    {
      path: "/user",
      Component: <User />,
    },
    {
      path: "/profile",
      Component: <Profile />,
    },
  ];
  return (
    <>
      <Routes>
        {routes.map((element, index) => (
          <Route key={index} path={element.path} element={element.Component} />
        ))}
      </Routes>
    </>
  );
}

export default AdminRouters;
