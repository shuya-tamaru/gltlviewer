import { Box, Textarea, Button } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";

import { useState } from "react";

export default function CommentForm() {

  const[buttonToggle, setButtonToggle] = useState<boolean>(true);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Box w="100%" h="30%" display="flex" alignItems="center" flexDirection="column" p="2.5">
        <form style={{width:"100%", height:"100%" }} onSubmit = {(e) => handleSubmit(e)}>
          <Textarea w="100%" h="80%" placeholder='コメントを入力' borderColor="#999" border="2px" />
          <Box w="100%" h="20%" mt="2" display="flex" justifyContent="space-between">
            <Box display="flex">
              <BiImageAdd style={{marginLeft:"5px", cursor:"pointer"}} size={30}/>
              <GrDocumentPdf style={{marginLeft:"5px", cursor:"pointer"}} size={30}/>
            </Box>
              <Box display="flex">
                {buttonToggle ? (
                  <Button colorScheme='red' ml="2">Add</Button>
                ):(
                  <>
                    <Button colorScheme='red' ml="2">Update</Button>
                    <Button colorScheme='red' ml="2">Delete</Button>
                  </>
                )}
                <Button colorScheme='red' ml="2">Cancel</Button>
              </Box> 
          </Box>
        </form>
      </Box>
    </>
  );
}