import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Story from '../Components/StoryCard';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import { Radio, RadioChangeEvent, Row } from 'antd';

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: "All", value: "all" },
  { label: "Followings", value: "followings" },
  

];


interface Story {
    id: number;
    text: string;
    header: string;
    user: {
      id: number;
      name: string;
    };
    labels:string[];
    likes: number[]
    comments:{
      text:string;
      user: {
        id: number;
        name: string;
      };
      likes:number[]
    }[]
  }
const HomePage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("all");


  useEffect(() => {
    const fetchStories = async () => {
      const url =
      selectedOption === "all"
        ? `http://localhost:8080/stories`
        : `http://localhost:8080/stories/following`;

      const response = await axios.get<Story[]>(url, {
        withCredentials: true
      });
      setStories(response.data);
    };

    fetchStories();
  }, [selectedOption]);

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <NavBar/>
      <h1 style={{ textAlign: "center" ,fontFamily: 'HandWriting' , margin:"10px" }}>Recent Stories</h1>
      <Row style={{justifyContent:"center"}}>
        <Radio.Group style={{margin:"5px"}}
                options={options}
                onChange={onRadioChange}
                value={selectedOption}
                optionType="button"
                buttonStyle="solid"
                
              /></Row>
      <ul style={{listStyle:"none" , marginRight : "10px"}}>
        {stories.reverse().map((story: Story) => (
          <li key={story.id}>
            <Story story={story} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
