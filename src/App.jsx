import { useState, useEffect } from 'react'
import { VariantProvider, useVariant } from './variants/VariantProvider'
import Screen1Feed from './screens/Screen1Feed'
import Screen2ImageSelection from './screens/Screen2ImageSelection'
import Screen3MultiSelect from './screens/Screen3MultiSelect'
import Screen4EditPost from './screens/Screen4EditPost'
import Screen5AddCaption from './screens/Screen5AddCaption'
import Screen6Profile from './screens/Screen6Profile'
import PreviewScreen from './screens/PreviewScreen'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [selectedImages, setSelectedImages] = useState([])
  const [multiSelectMode, setMultiSelectMode] = useState(false)
  const [imagesForEdit, setImagesForEdit] = useState([])
  const [previousScreen, setPreviousScreen] = useState(2) // Track which screen we came from
  const [showPreview, setShowPreview] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [profilePosts, setProfilePosts] = useState([
    'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
  ])
  
  const [feedPosts, setFeedPosts] = useState([
    {
      username: 'gursky.studio',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=500&fit=crop',
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
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
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
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
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
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
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
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=500&fit=crop',
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
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop',
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

  const handleNextFromEdit = (images) => {
    // Update imagesForEdit if new order was passed
    if (images && images.length > 0) {
      setImagesForEdit(images)
    }
    navigateToScreen(5)
  }

  const handleOpenPreview = (images) => {
    setPreviewImages(images)
    setShowPreview(true)
  }

  const handlePreviewDone = (reorderedImages) => {
    setImagesForEdit(reorderedImages)
    setShowPreview(false)
    // Force re-render of Screen4EditPost with new images
    setCurrentScreen(4)
  }

  const handlePreviewCancel = () => {
    setShowPreview(false)
    // Return to Screen4EditPost (images remain unchanged)
  }

  const handleShare = (images, caption) => {
    // Create a new post object
    const newPost = {
      username: 'gursky.studio',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      image: images[0] || 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=500&fit=crop',
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

  // Set body class based on current screen
  useEffect(() => {
    const body = document.body
    // Remove all screen classes
    body.classList.remove('screen-1', 'screen-2', 'screen-3', 'screen-4', 'screen-5', 'screen-6', 'screen-preview')
    
    // Add class for current screen
    if (currentScreen === 4 && showPreview) {
      body.classList.add('screen-preview')
    } else {
      body.classList.add(`screen-${currentScreen}`)
    }
  }, [currentScreen, showPreview])

  return (
    <VariantProvider>
      <AppContent
        currentScreen={currentScreen}
        handlePlusClick={handlePlusClick}
        feedPosts={feedPosts}
        navigateToScreen={navigateToScreen}
        handleNextFromSelection={handleNextFromSelection}
        handleMultiSelectToggle={handleMultiSelectToggle}
        multiSelectMode={multiSelectMode}
        handleNextFromEdit={handleNextFromEdit}
        imagesForEdit={imagesForEdit}
        previousScreen={previousScreen}
        showPreview={showPreview}
        previewImages={previewImages}
        handleOpenPreview={handleOpenPreview}
        handlePreviewDone={handlePreviewDone}
        handlePreviewCancel={handlePreviewCancel}
        profilePosts={profilePosts}
        handleShare={handleShare}
      />
    </VariantProvider>
  )
}

function AppContent({
  currentScreen,
  handlePlusClick,
  feedPosts,
  navigateToScreen,
  handleNextFromSelection,
  handleMultiSelectToggle,
  multiSelectMode,
  handleNextFromEdit,
  imagesForEdit,
  previousScreen,
  showPreview,
  previewImages,
  handleOpenPreview,
  handlePreviewDone,
  handlePreviewCancel,
  profilePosts,
  handleShare,
}) {
  const { variantId } = useVariant()

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
      {currentScreen === 4 && !showPreview && (
        <Screen4EditPost
          onClose={() => navigateToScreen(previousScreen)}
          onNext={handleNextFromEdit}
          images={imagesForEdit}
          onOpenPreview={handleOpenPreview}
        />
      )}
      {currentScreen === 4 && showPreview && (
        <PreviewScreen
          images={previewImages}
          onCancel={handlePreviewCancel}
          onDone={handlePreviewDone}
          isMultiSelect={previewImages.length > 1}
          profilePosts={profilePosts}
        />
      )}
      {currentScreen === 5 && (
        <Screen5AddCaption
          onBack={() => navigateToScreen(4)}
          onShare={handleShare}
          images={imagesForEdit}
          profilePosts={profilePosts}
        />
      )}
      {currentScreen === 6 && (
        <Screen6Profile onHomeClick={() => navigateToScreen(1)} postImages={profilePosts} />
      )}
    </div>
  )
}

export default App

