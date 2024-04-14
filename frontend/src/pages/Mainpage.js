import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState,useEffect } from "react";
import { MdDelete } from 'react-icons/md'
import  axios  from "axios";

const Mainpage = () => {

    const [list,setList] = useState("");
    const [lists,setLists] = useState([]);
    const token = localStorage.getItem('token');

    console.log(lists)

    useEffect(()=>{
        const getTodo = async()=>{
            try{
                const response = await axios.get('http://localhost:4000/getTodo', {
                headers:{
                  'authorization': `Bearer ${token}`
                }
                });

                console.log(response.data)
                setLists(response.data)
            }
            catch{

            }
        }
        getTodo()
    },[])

    const listFn= async(event)=>{
        setLists([...lists,list])
        const lastElement = list
        console.log(lastElement);

        try{

            
            console.log("this is"+token)
            const response = await axios.post('http://localhost:4000/add', {lastElement},{
              headers:{
                'authorization': `Bearer ${token}`
              }
            });
            console.log(response)
        }
        catch(error)
        {

        }
        
    }

    const handleDelete = async (indexToDelete) => {
        const toDelete=lists[indexToDelete]
        setLists(lists.filter((_, index) => index !== indexToDelete));

        try{
        const response = await axios.post('http://localhost:4000/delete', {toDelete},{
          headers:{
            'authorization': `Bearer ${token}`
          }
        });
        console.log(response)
      }
        catch(error){
            console.log(error)
        }
      };

  return (

   <>
  <div className="text-4xl flex justify-center mt-10 font-scp">What are you planning?</div>
  <div className="flex justify-center pt-10 mt-20 w-full">
    <div className="flex flex-col items-center gap-6">
      <div className="w-72 flex flex-col items-end gap-6">
        <Input 
          value={list} 
          onChange={(e) => { setList(e.target.value) }} 
          size="lg" 
          label="What do you want to do?" 
          className="border-2 border-gray-300 focus:border-blue-500 rounded-lg"
        />
        <Button 
          onClick={(event) => listFn(event)} 
          type="submit" 
          size="md form-scp"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ADD
        </Button>
      </div>
      <ul className="border-2 border-gray-200 rounded-lg shadow-lg w-72">
            {lists.map((data, index) => (
              <li
                className="font-scp text-2xl py-2 px-4 flex justify-between items-center border-b last:border-b-0 hover:bg-gray-100"
                key={index}
              >
                {data}
                <MdDelete 
                  className="cursor-pointer hover:text-red-500"
                  onClick={()=>{handleDelete(index)}}
                  size="1.5em" 
                />
              </li>
            ))}
          </ul>
    </div>
  </div>
</>

  );
};

export default Mainpage
