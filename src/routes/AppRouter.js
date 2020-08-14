import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import AuthService from '../services/auth-service'

import GlobalStyle from '../GlobalStyle'

// UI components

import HomeScreen from '../components/ui/Home/HomeScreen'
import AboutScreen from '../components/ui/AboutScreen/AboutSreen.js'
import ContactScreen from '../components/ui/ContactScreen/ContactScreen'
import Footer from '../components/ui/Footer/Footer'

// Blog
import Blog from '../components/blog/Blog'
import SinglePost from '../components/blog/single-post/SinglePost'

// Auth & User
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Profile from '../components/ui/Profile/Profile'
import EditProfile from '../components/ui/Profile/EditProfile'

import AdminRoot from '../admin/components/ui/AdminRoot'
import Home from '../admin/components/pages/Home/Home'
import About from '../admin/components/pages/About/About'
import Contact from '../admin/components/pages/Contact/Contact'
import BlogPost from '../admin/components/pages/BlogPost/BlogPost'
import AddPost from '../admin/components/pages/BlogPost/AddPost'
import EditPost from '../admin/components/pages/BlogPost/EditPost'
import EditHome from '../admin/components/pages/Home/EditHome'
import { UpdateTestimonial } from '../admin/components/pages/Home/Forms/Testimonials/UpdateTestimonial'
import { UpdateHero } from '../admin/components/pages/Home/Forms/UpdateHero'
import { UpdateValuesSection } from '../admin/components/pages/Home/Forms/UpdateValuesSections'
import { UpdateIconValues } from '../admin/components/pages/Home/Forms/UpdateIconValues'
import { UpdateCard } from '../admin/components/pages/Home/Forms/Cards/UpdateCard'
import { UpdateSecondCard } from '../admin/components/pages/Home/Forms/Cards/UpdateSecondCard'
import Testimonials from '../components/ui/Home/sections/Testimonials/Testimonials'

export default function AppRouter() {
  const currentUser = AuthService.getCurrentUser()

  return (
    <Router>
      <GlobalStyle />
      <>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/nosotros" component={AboutScreen} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/:id/:slug" component={SinglePost} />
          <Route exact path="/contacto" component={ContactScreen} />
          <Route exact path="/admin-area" component={AdminRoot} />
          <PublicRoute
            exact
            path="/login"
            component={Login}
            isAuthenticated={!!currentUser}
          />
          <PublicRoute
            exact
            path="/register"
            component={Register}
            isAuthenticated={!!currentUser}
          />
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
            isAuthenticated={!!currentUser}
          />
          <PrivateRoute
            exact
            path="/edit-profile"
            component={EditProfile}
            isAuthenticated={!!currentUser}
          />
          <PrivateRoute
            exact
            path="/pages/home"
            component={Home}
            isAuthenticated={!!currentUser}
          />
          <PrivateRoute
            exact
            path="/pages/home/edit"
            component={EditHome}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/home/testimonials"
            component={Testimonials}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/home/edit-testimonial/:id"
            component={UpdateTestimonial}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/home/edit-hero"
            component={UpdateHero}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/home/edit-values"
            component={UpdateValuesSection}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/home/edit-values-icons"
            component={UpdateIconValues}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/home/edit-card"
            component={UpdateCard}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/home/edit-second-card"
            component={UpdateSecondCard}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/about"
            component={About}
            isAuthenticated={!!currentUser}
          />
          <PrivateRoute
            exact
            path="/pages/contact"
            component={Contact}
            isAuthenticated={!!currentUser}
          />

          <PrivateRoute
            exact
            path="/pages/posts"
            component={BlogPost}
            isAuthenticated={!!currentUser}
          />
          <PrivateRoute
            exact
            path="/pages/add-post"
            component={AddPost}
            isAuthenticated={!!currentUser}
          />
          <PrivateRoute
            exact
            path="/pages/edit-post/:id"
            component={EditPost}
            isAuthenticated={!!currentUser}
          />
        </Switch>
      </>
      <Footer />
    </Router>
  )
}
