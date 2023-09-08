import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const BackgroundImage = () => {
    const location = useLocation();

  useEffect(() => {
    console.log('Route has changed to:', location.pathname);

    // This will cause the component to rerender whenever the location.pathname changes.

  }, [location.pathname]);

  const getBackgroundImage = () => {
    switch (location.pathname) {
      case '/about':
        return 'url("/images/bg/5.jpg")';
      case '/user':
        return 'url("https://c4.wallpaperflare.com/wallpaper/937/285/225/video-game-don-t-starve-wallpaper-preview.jpg")';
      case '/admin':
        return 'url("https://cdn.steamstatic.com/steamcommunity/public/images/items/322330/86ad38fbb8b61da03913adf269def61231ff595b.jpg")';
      case '/info':
        return 'url("https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/322330/3a199d0d5519403084592633e3d47a81afaae9e3.jpg")';
      case '/login':
        return 'url("/images/bg/5.jpg")';
      case '/registration':
        return 'url("https://c4.wallpaperflare.com/wallpaper/937/285/225/video-game-don-t-starve-wallpaper-preview.jpg")';
      case '/home':
        return 'url("https://c4.wallpaperflare.com/wallpaper/937/285/225/video-game-don-t-starve-wallpaper-preview.jpg")';
      default:
        return 'url("https://c4.wallpaperflare.com/wallpaper/937/285/225/video-game-don-t-starve-wallpaper-preview.jpg")'; 
    }
  };

  const backgroundStyle = {
    backgroundImage: getBackgroundImage(),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', // Optional: You can adjust this based on your preference
  };

  return <div className="background-image" style={backgroundStyle}></div>;
};

export default BackgroundImage;




