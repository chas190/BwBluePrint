import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Play, ExternalLink, User, ChevronDown, Video } from 'lucide-react';
import Navigation from '@/components/Navigation';

const VideoPlayer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoId, setVideoId] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [channelInfo, setChannelInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [isVideoPlayerInfoOpen, setIsVideoPlayerInfoOpen] = useState(false);
  const [isRelatedVideosOpen, setIsRelatedVideosOpen] = useState(true);
  const [isLoadVideoOpen, setIsLoadVideoOpen] = useState(true);

  // Ref for video player section
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  // Default video ID from the provided URL
  const defaultVideoId = 'ZmzLT6kmajM';

  // Demo related videos
  const relatedVideos = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channel: 'Rick Astley'
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
      channel: 'Luis Fonsi'
    },
    {
      id: 'fJ9rUzIMcZQ',
      title: 'Queen – Bohemian Rhapsody',
      thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
      channel: 'Queen Official'
    },
    {
      id: 'L_jWHffIx5E',
      title: 'Smash Mouth - All Star',
      thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
      channel: 'Smash Mouth'
    }
  ];

  // Extract video ID from various YouTube URL formats
  const extractVideoId = (url: string): string => {
    if (!url) return '';

    // If it's already just an ID (11 characters)
    if (url.length === 11 && !url.includes('/') && !url.includes('=')) {
      return url;
    }
    const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/, /youtube\.com\/v\/([^&\n?#]+)/, /youtube\.com\/shorts\/([^&\n?#]+)/];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return '';
  };

  // Fetch video information using YouTube oEmbed API
  const fetchVideoInfo = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
      if (response.ok) {
        const data = await response.json();
        setChannelInfo({
          title: data.title,
          author: data.author_name,
          channelUrl: data.author_url,
          thumbnail: data.thumbnail_url
        });
      } else {
        setError('Failed to fetch video information');
      }
    } catch (err) {
      console.error('Error fetching video info:', err);
      setError('Error loading video information');
    } finally {
      setLoading(false);
    }
  };

  // Handle URL/ID input and update video
  const handleVideoLoad = () => {
    const id = extractVideoId(inputUrl);
    if (id) {
      setVideoId(id);
      setSearchParams({
        v: id
      });
      fetchVideoInfo(id);
      setError('');
    } else {
      setError('Invalid YouTube URL or video ID');
    }
  };

  // Handle related video click with scroll to top
  const handleRelatedVideoClick = (id: string) => {
    setVideoId(id);
    setSearchParams({
      v: id
    });
    setInputUrl(`https://youtu.be/${id}`);
    fetchVideoInfo(id);
    setError('');

    // Scroll to video player
    setTimeout(() => {
      videoPlayerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  // Initialize video from URL params or default
  useEffect(() => {
    const urlVideoId = searchParams.get('v');
    const initialId = urlVideoId || defaultVideoId;
    if (initialId) {
      setVideoId(initialId);
      setInputUrl(`https://youtu.be/${initialId}`);
      fetchVideoInfo(initialId);
    }
  }, [searchParams]);
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVideoLoad();
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 max-w-6xl py-[42px]">
        {/* Video Player Section - Now above Load Video card */}
        {videoId && (
          <Card className="mb-8">
            <CardContent className="p-0">
              <div ref={videoPlayerRef} className="py-[12px]">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title="YouTube Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* URL Input Section with Gradient Background - Now Collapsible */}
        <Card className="mb-8 bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-800 text-white">
          <Collapsible open={isLoadVideoOpen} onOpenChange={setIsLoadVideoOpen}>
            <CardHeader>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Play className="w-5 h-5" />
                    Load Video
                  </CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-white ${isLoadVideoOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            
            {/* Always visible URL input and load button */}
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter YouTube URL or video ID (e.g., https://youtu.be/ZmzLT6kmajM or ZmzLT6kmajM)"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
                <Button onClick={handleVideoLoad} disabled={loading} variant="secondary">
                  {loading ? 'Loading...' : 'Load Video'}
                </Button>
              </div>
              {error && <p className="text-red-200 text-sm mt-2">{error}</p>}
            </CardContent>

            {/* Collapsible Video App Viewer Section */}
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className={`text-center ${!videoId ? 'pt-20' : ''}`}>
                  <h1 className="text-4xl font-bold mb-4 text-white">Video App Viewer</h1>
                  <p className="text-xl text-white/90">
                    Enter a YouTube URL or video ID to watch videos
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Related Videos Card */}
        <Card className="mb-8">
          <Collapsible open={isRelatedVideosOpen} onOpenChange={setIsRelatedVideosOpen}>
            <CardHeader>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Related Videos
                  </CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isRelatedVideosOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {relatedVideos.map((video) => (
                      <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 xl:basis-1/4">
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleRelatedVideoClick(video.id)}>
                          <CardContent className="p-0">
                            <div className="aspect-video relative overflow-hidden rounded-t-lg">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <Play className="w-12 h-12 text-white" />
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-sm mb-2 line-clamp-2">{video.title}</h3>
                              <p className="text-xs text-gray-600">{video.channel}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Expandable Video Player Info Card */}
        <Card className="mb-8">
          <Collapsible open={isVideoPlayerInfoOpen} onOpenChange={setIsVideoPlayerInfoOpen}>
            <CardHeader>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Video Information
                  </CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isVideoPlayerInfoOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                {/* Video Information Card as child */}
                {videoId && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Video Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {loading ? (
                        <p className="text-gray-500">Loading video information...</p>
                      ) : channelInfo ? (
                        <>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Title</h3>
                            <p className="text-gray-700">{channelInfo.title}</p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Channel</h3>
                            <p className="text-gray-700 mb-2">{channelInfo.author}</p>
                            {channelInfo.channelUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(channelInfo.channelUrl, '_blank')}
                                className="flex items-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Visit Channel
                              </Button>
                            )}
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg mb-2">Current Video</h3>
                            <p className="text-sm text-gray-600 break-all">
                              Video ID: {videoId}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`https://youtu.be/${videoId}`, '_blank')}
                              className="flex items-center gap-2 mt-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Watch on YouTube
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500">No video information available</p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Instructions with Quick Examples */}
        <Card className="mt-8">
          <Collapsible open={isHowToUseOpen} onOpenChange={setIsHowToUseOpen}>
            <CardHeader>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <CardTitle>How to Use</CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isHowToUseOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Enter a YouTube URL (e.g., https://youtu.be/ZmzLT6kmajM) or just the video ID (e.g., ZmzLT6kmajM)</li>
                  <li>Press Enter or click "Load Video" to play the video</li>
                  <li>The player will automatically fetch channel information when available</li>
                  <li>Use the sidebar to access channel information and external links</li>
                  <li>The URL will update with the video ID for easy sharing</li>
                  <li>Click on any related video to play it instantly</li>
                </ul>

                {/* Quick Examples */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-4">Quick Examples</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setInputUrl('https://youtu.be/ZmzLT6kmajM');
                        setVideoId('ZmzLT6kmajM');
                        setSearchParams({ v: 'ZmzLT6kmajM' });
                        fetchVideoInfo('ZmzLT6kmajM');
                      }}
                      className="w-full justify-start text-left"
                    >
                      Default Video (ZmzLT6kmajM)
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const id = 'dQw4w9WgXcQ';
                        setInputUrl(`https://youtu.be/${id}`);
                        setVideoId(id);
                        setSearchParams({ v: id });
                        fetchVideoInfo(id);
                      }}
                      className="w-full justify-start text-left"
                    >
                      Sample Video (dQw4w9WgXcQ)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  );
};

export default VideoPlayer;

