import React,{useState, useEffect} from 'react'
import './Feed.css';
import InputOption from './InputOption';
import Post from './Post';
import FlipMove from 'react-flip-move';

// Firebase
import {db} from '../../firebase';
import firebase from 'firebase';

// Material UI
import ImageIcon from '@mui/icons-material/Image';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CreateIcon from "@material-ui/icons/Create";
import {useSelector} from "react-redux";
import {selectUser} from '../../app/userSlice';

function Feed() {

    const user = useSelector(selectUser);

    const [posts,setPosts] = useState([]);
    const [input,setInput] = useState('');
    

    useEffect(() => {
        document.body.style.backgroundColor = "#f3f2ef";
    },[]);

    useEffect(()=>{
        db.collection('posts')
        .orderBy('timestamp','desc')
        .onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc=>(
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    }, []);

    const sendPost = (e) => {
        e.preventDefault();
        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

    return (
        <div className='feed'>
             <div className='feed__inputContainer'>
                <div className='feed__input'>
                    <CreateIcon />
                    <form>
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={ImageIcon} title='Photo' color='#70C5F9'/>
                    <InputOption Icon={SubscriptionsIcon} title='Video' color='#E7A33E'/>
                    <InputOption Icon={ArticleIcon} title='Write article' color='#7FC15E'/>
                    <InputOption Icon={EventIcon} title='Event' color='#C0CBCD'/>
                </div>
            </div>


            {/* Displaying Posts */}
            <FlipMove>
                {posts.map(
                    ({ id, data: { name, description, message, photoUrl} }) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))}
            </FlipMove>
        
        </div>
    )
}

export default Feed
