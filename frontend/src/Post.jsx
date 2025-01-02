import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
    Home,
    SmilePlus,
    Heart,
    Brain,
    Cloud,
    Sun,
    ChevronRight,
    Send,
    Link as LinkIcon,
    Image, 
    ChevronDown,
    Users,
    Search,
    Pencil,
    Trash2,
    ThumbsUp,
    MessageCircle
} from 'lucide-react';


// interface Post {
//     _id: string;
//     content: string;
//     imageUrl?: string;
//     category: string;
//     author: {
//         _id: string;
//         username: string;
//         avatar: string;
//     };
//     createdAt: string;
//     upvotes: string[];
//     comments: Array<{
//         _id: string;
//         user: {
//             _id: string;
//             username: string;
//             avatar: string;
//         };
//         content: string;
//         createdAt: string;
//     }>;
// }


const Post = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [postCategory, setPostCategory] = useState<string>('General');

    const categories = ['Lost', 'Found', 'Suggestion', 'Discussion']

    const [editingPost, setEditingPost] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const [editSelectedImage, setEditSelectedImage] = useState<File | null>(null);
    const editFileInputRef = useRef<HTMLInputElement>(null);



    useEffect(() => {
        fetchPosts();
    }, []);
    
    const handleComment = async (postId, content) => {
        try {
            // const token = localStorage.getItem('token');
            // await axios.post(`http://localhost:5000/posts/${postId}/comments`,
            //     { content },
            //     { headers: { Authorization: `Bearer ${token}` } }
            // );
            // fetchPosts();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };


    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts');
            console.log('Fetched posts:', response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePost = async () => {
        if (!postText.trim()) return;
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('content', postText);
            formData.append('category', postCategory);

            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            // await axios.post('http://localhost:5000/posts', formData, {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });

            setPostText('');
            setSelectedImage(null);
            setImagePreview(null);
            setPostCategory('General');
            await fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    const handleEditPost = async (postId, content) => {
        try {
            // const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('content', content);
            formData.append('category', postCategory);

            // Handle image updates
            if (editSelectedImage) {
                formData.append('image', editSelectedImage);
            }
            // Explicitly handle image removal
            if (!editImagePreview) {
                formData.append('removeImage', 'true');
            }

            // await axios.put(`http://localhost:5000/posts/${postId}`, formData, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });

            setEditingPost(null);
            setEditContent('');
            setEditImagePreview(null);
            setEditSelectedImage(null);
            if (editFileInputRef.current) {
                editFileInputRef.current.value = '';
            }

            await fetchPosts();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };



    const handleDeletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                // const token = localStorage.getItem('token');
                // await axios.delete(`http://localhost:5000/posts/${postId}`, {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
                fetchPosts();
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };
    
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching user...');
                // const token = localStorage.getItem('token');
                // console.log('Token:', token);
                // const response = await axios.get('http://localhost:5000/profile', {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
                setCurrentUser(response.data.user);
                console.log(response.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);


    return (
        <div className="min-h-screen bg-[#C5C5C5]/10 p-6 flex gap-8">
       

            {/* Main Content */}
            <div className="flex-1 space-y-6">
                {/* Post Creation Box */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#C5C5C5]">
                    <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 bg-[#4D6A6D] rounded-full flex items-center justify-center text-white">
                            <Users size={20} />
                        </div>
                        <div className="flex-1">
                            <textarea
                                className="w-full p-4 rounded-lg border border-[#C5C5C5] focus:border-[#4D6A6D] focus:ring-1 focus:ring-[#4D6A6D] resize-none"
                                placeholder="Share your thoughts with the community..."
                                rows={3}
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                            />
                            
                            {/* Image preview and buttons */}
                            <div className="flex justify-between mt-4">
                                <div className="flex gap-4">
                                    <button
                                        onClick={triggerFileInput}
                                        className="flex items-center gap-2 text-[#4D6A6D] hover:text-[#829191]"
                                    >
                                        <Image size={18} />
                                        Photo
                                    </button>
                                    <button className="flex items-center gap-2 text-[#4D6A6D] hover:text-[#829191]">
                                        <LinkIcon size={18} />
                                        Link
                                    </button>
                                </div>
                                <button 
                                    onClick={handlePost}
                                    className="bg-[#4D6A6D] text-white px-6 py-2 rounded-lg hover:bg-[#829191] transition-colors disabled:opacity-50"
                                >
                                    {isLoading ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4">
                    {posts
                        .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
                        .map((post) => (
                            <div key={post._id} className="bg-white p-4 rounded-lg shadow-md border border-[#C5C5C5]">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#4D6A6D] rounded-full" />
                                        <div>
                                            <h4 className="font-medium text-[#4C5B61]">{post.author.username}</h4>
                                            <p className="text-sm text-[#949896]">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Edit/Delete buttons */}
                                    {String(post.author._id) === String(currentUser?._id) && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingPost(post._id);
                                                    setEditContent(post.content);
                                                    setEditImagePreview(post.imageUrl ? `http://localhost:5000${post.imageUrl}` : null);
                                                }}
                                                className="text-[#4D6A6D] hover:text-[#829191]"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePost(post._id)}
                                                className="text-[#4D6A6D] hover:text-[#829191]"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Post content */}
                                <p className="mb-3 text-[#4C5B61]">{post.content}</p>
                                
                                {/* Interaction buttons */}
                                <div className="flex items-center gap-4 mt-4">
                                    <button
                                        onClick={() => handleUpvote(post._id)}
                                        className={`flex items-center gap-1 ${
                                            post.upvotes.includes(currentUser?._id)
                                                ? 'text-[#4D6A6D]'
                                                : 'text-[#949896]'
                                        }`}
                                    >
                                        <ThumbsUp size={18} />
                                        <span>{post.upvotes.length}</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveCommentPost(activeCommentPost === post._id ? null : post._id)}
                                        className="flex items-center gap-1 text-[#949896] hover:text-[#4D6A6D]"
                                    >
                                        <MessageCircle size={18} />
                                        <span>{post.comments.length}</span>
                                    </button>
                                </div>

                                {/* Comments section */}
                                <div className="bg-[#C5C5C5]/10 p-3 rounded mt-4">
                                    {post.comments.map((comment, index) => (
                                        <div key={index} className="bg-white p-3 rounded mb-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-[#4D6A6D] rounded-full" />
                                                    <div>
                                                        <span className="font-medium text-[#4C5B61]">{comment.user.username}</span>
                                                        <span className="text-xs text-[#949896] ml-2">
                                                            {new Date(comment.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-sm text-[#4C5B61]">{comment.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Post;