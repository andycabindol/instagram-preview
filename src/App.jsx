import { useState } from 'react'
import Screen1Feed from './screens/Screen1Feed'
import Screen2ImageSelection from './screens/Screen2ImageSelection'
import Screen3MultiSelect from './screens/Screen3MultiSelect'
import Screen4EditPost from './screens/Screen4EditPost'
import Screen5AddCaption from './screens/Screen5AddCaption'
import Screen6Profile from './screens/Screen6Profile'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [selectedImages, setSelectedImages] = useState([])
  const [multiSelectMode, setMultiSelectMode] = useState(false)
  const [imagesForEdit, setImagesForEdit] = useState([])
  const [previousScreen, setPreviousScreen] = useState(2) // Track which screen we came from
  const [profilePosts, setProfilePosts] = useState([
    'http://localhost:3845/assets/5f7a8ab847224a6fcd037ae7785396259c019449.png',
    'http://localhost:3845/assets/3b722c714bc39d648077d45bd046f19102476402.png',
    'http://localhost:3845/assets/ff54acb39e21a7802526cd38090f80738fc604af.png',
    'http://localhost:3845/assets/3ad05cc6647c86e275d256ef92fff2926bbcd020.png',
    'http://localhost:3845/assets/f70da884556d448739bb8f23e277e3955ee66cd3.png',
    'http://localhost:3845/assets/f6e5fbd603ae2713a9021e89080d29123ba83ad8.png',
    'http://localhost:3845/assets/e288872889e28e5744aae4abd9b756a67b8a91b1.png',
    'http://localhost:3845/assets/59fbbf9ea908c1fde0f911ae75e3dedfc5a333a5.png',
    'http://localhost:3845/assets/7f1b1c5f2c0851df6518654bd6ced7384b984cc1.png',
    'http://localhost:3845/assets/9d16b88e1e13e036e5c78a94904bd433f1543315.png',
    'http://localhost:3845/assets/c953879aca4319f56ece82a4bcf7db19af094740.png',
    'http://localhost:3845/assets/396941d94def95eb4be902d9ed8ecabf81774414.png',
    'http://localhost:3845/assets/6e3edc07a961e2a2edb3db46980a46a101f08157.png',
    'http://localhost:3845/assets/76bccfc15181a44fafda4a332ed1992951070130.png',
  ])
  
  const [feedPosts, setFeedPosts] = useState([
    {
      username: 'gursky.studio',
      verified: true,
      avatar: 'http://localhost:3845/assets/28452d94f6c6b766a5d79db42b3bedceec23a9db.png',
      image: 'http://localhost:3845/assets/5f7a8ab847224a6fcd037ae7785396259c019449.png',
      likes: '1.139',
      comments: '58',
      shares: '7',
      likedBy: 'your friend',
      totalLikes: '25.513',
      caption: 'Mesmerizing colors and graceful movements!',
      caption2: 'This tropical bird truly embodies the beauty of nature\'s vibrant palette',
      commentUser: 'username',
      comment: 'Mi ac enim varius dictumst odio sed 🙌',
      time: '11 hours ago'
    },
    {
      username: 'photographer.pro',
      verified: false,
      avatar: 'http://localhost:3845/assets/aaaf628de260c2832e6e403cc52aca3cd168402d.png',
      image: 'http://localhost:3845/assets/3b722c714bc39d648077d45bd046f19102476402.png',
      likes: '892',
      comments: '23',
      shares: '12',
      likedBy: 'friend1',
      totalLikes: '8.2K',
      caption: 'Golden hour magic ✨',
      caption2: 'There\'s something special about the light at this time of day',
      commentUser: 'user123',
      comment: 'Absolutely stunning! 🔥',
      time: '2 hours ago'
    },
    {
      username: 'nature.lover',
      verified: false,
      avatar: 'http://localhost:3845/assets/8637874c7b73e4ad8e93f4f674a9469989a1b28a.png',
      image: 'http://localhost:3845/assets/911201df39ab707766f6d049048e21d7c0789617.png',
      likes: '2.4K',
      comments: '156',
      shares: '89',
      likedBy: 'nature_fan',
      totalLikes: '42.1K',
      caption: 'Mountain views never get old 🏔️',
      commentUser: 'traveler',
      comment: 'Where is this? Beautiful!',
      time: '5 hours ago'
    },
    {
      username: 'art.daily',
      verified: true,
      avatar: 'http://localhost:3845/assets/28452d94f6c6b766a5d79db42b3bedceec23a9db.png',
      image: 'http://localhost:3845/assets/5f7a8ab847224a6fcd037ae7785396259c019449.png',
      likes: '5.7K',
      comments: '234',
      shares: '145',
      likedBy: 'art_collector',
      totalLikes: '128.5K',
      caption: 'New piece in progress 🎨',
      caption2: 'Experimenting with new techniques and colors',
      commentUser: 'art_lover',
      comment: 'Can\'t wait to see the finished piece!',
      time: '1 day ago'
    },
    {
      username: 'foodie.world',
      verified: false,
      avatar: 'http://localhost:3845/assets/aaaf628de260c2832e6e403cc52aca3cd168402d.png',
      image: 'http://localhost:3845/assets/3b722c714bc39d648077d45bd046f19102476402.png',
      likes: '3.1K',
      comments: '189',
      shares: '67',
      likedBy: 'food_enthusiast',
      totalLikes: '56.8K',
      caption: 'Homemade pasta perfection 🍝',
      commentUser: 'chef_life',
      comment: 'Recipe please! 👨‍🍳',
      time: '3 hours ago'
    },
    {
      username: 'fitness.motivation',
      verified: false,
      avatar: 'http://localhost:3845/assets/8637874c7b73e4ad8e93f4f674a9469989a1b28a.png',
      image: 'http://localhost:3845/assets/911201df39ab707766f6d049048e21d7c0789617.png',
      likes: '8.9K',
      comments: '456',
      shares: '234',
      likedBy: 'fit_fam',
      totalLikes: '234.7K',
      caption: 'Morning workout complete! 💪',
      caption2: 'Starting the day right with some cardio and strength training',
      commentUser: 'workout_buddy',
      comment: 'Inspiring! Keep it up! 🔥',
      time: '6 hours ago'
    }
  ])

  const navigateToScreen = (screenNumber) => {
    setCurrentScreen(screenNumber)
  }

  const handlePlusClick = () => {
    navigateToScreen(2)
  }

  const handleMultiSelectToggle = () => {
    setMultiSelectMode(!multiSelectMode)
    // Only navigate to Screen 3 if we're not already on Screen 2
    if (!multiSelectMode && currentScreen !== 2) {
      navigateToScreen(3)
    }
  }

  const handleNextFromSelection = (images) => {
    setImagesForEdit(images)
    setPreviousScreen(currentScreen) // Remember which screen we're coming from
    navigateToScreen(4)
  }

  const handleNextFromEdit = () => {
    navigateToScreen(5)
  }

  const handleShare = (images, caption) => {
    // Create a new post object
    const newPost = {
      username: 'gursky.studio',
      verified: true,
      avatar: 'http://localhost:3845/assets/28452d94f6c6b766a5d79db42b3bedceec23a9db.png',
      image: images[0] || 'http://localhost:3845/assets/5f7a8ab847224a6fcd037ae7785396259c019449.png',
      images: images, // Store all images for carousel support
      likes: '0',
      comments: '0',
      shares: '0',
      likedBy: '',
      totalLikes: '0',
      caption: caption || '',
      caption2: null,
      commentUser: null,
      comment: null,
      time: 'just now'
    }
    
    // Add the new post to the beginning of the feed
    setFeedPosts([newPost, ...feedPosts])
    
    // Add all images from the post to the profile grid (at the beginning)
    setProfilePosts([...images, ...profilePosts])
    
    // Navigate to feed (Screen 1)
    navigateToScreen(1)
  }

  return (
    <div className="app-container">
      {currentScreen === 1 && (
        <Screen1Feed 
          onPlusClick={handlePlusClick} 
          posts={feedPosts}
          onProfileClick={() => navigateToScreen(6)}
        />
      )}
      {currentScreen === 2 && (
        <Screen2ImageSelection
          onClose={() => navigateToScreen(1)}
          onNext={handleNextFromSelection}
          onMultiSelectToggle={handleMultiSelectToggle}
          multiSelectMode={multiSelectMode}
        />
      )}
      {currentScreen === 3 && (
        <Screen3MultiSelect
          onClose={() => navigateToScreen(1)}
          onNext={handleNextFromSelection}
        />
      )}
      {currentScreen === 4 && (
        <Screen4EditPost
          onClose={() => navigateToScreen(previousScreen)}
          onNext={handleNextFromEdit}
          images={imagesForEdit}
        />
      )}
      {currentScreen === 5 && (
        <Screen5AddCaption
          onBack={() => navigateToScreen(4)}
          onShare={handleShare}
          images={imagesForEdit}
        />
      )}
      {currentScreen === 6 && (
        <Screen6Profile onHomeClick={() => navigateToScreen(1)} postImages={profilePosts} />
      )}
    </div>
  )
}

export default App

