import TopNavigation from '@/components/task/TopNavigation';
import { BsPlusCircleFill } from 'react-icons/bs';
// import { useState } from 'react';

const ContentContainer = () => {
  return (
    <div className='content-container'>
      <TopNavigation />
      <div className='content-list'>
        <Post
          name='Task 1'
          timestamp='one week ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
        />
        <Post name='Task 2' timestamp='one week ago' text={`Lorem ipsum dolor. `} />
        <Post name='Task 3' timestamp='5 days ago' text={`Lorem.`} />
        <Post
          name='Presentation'
          timestamp='4 days ago'
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
        />
      </div>
    </div>
  );
};

const BottomBar = () => (
  <div className='bottom-bar'>
    <PlusIcon />
    <input type='text' placeholder='Enter message...' className='bottom-bar-input' />
  </div>
);

const Post = ({ name, timestamp, text }) => {

  const seed = Math.round(Math.random() * 100);
  return (
    <div className={'post'}>
      <div className='avatar-wrapper'>
        <img src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`} alt='' className='avatar' />
      </div>

      <div className='post-content'>
        <p className='post-owner'>
          {name}
          <small className='timestamp'>{timestamp}</small>
        </p>
        <p className='post-text'>{text}</p>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <BsPlusCircleFill
    size='22'
    className='text-green-500 dark:shadow-lg mx-2 dark:text-primary'
  />
);

export default ContentContainer;
