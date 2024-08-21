import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const BakeryInsert = () => {
 
  const navigate = useNavigate();  
  const [Bhp, SetBhp] = useState("");
  const [Bname, SetBname] = useState("");
  const [Baddr, SetBaddr] = useState("");
  const [Bmemo, SetBmemo] = useState("");
  const [Mnick, SetMnick] = useState("");

  const bhpHandler = (e) => {e.preventDefault();SetBhp(e.target.value);};
  const bnameHandler = (e) => {e.preventDefault();SetBname(e.target.value);};
  const baddrHandler = (e) => {e.preventDefault();SetBaddr(e.target.value);};
  const bmemoHandler = (e) => {e.preventDefault();SetBmemo(e.target.value);};
  const mnickHandler = (e) => {e.preventDefault();SetMnick(e.target.value);};

  const [file, setFile] = useState(null);
  const onFileChange = (e) => {setFile(e.target.files[0]);};

  const saveMyuser = async (e) => {
    e.preventDefault();
    alert("savebakery >>> : ");

    const formData = new FormData();
    formData.append('bname', Bname);
    formData.append('bhp', Bhp);
    formData.append('baddr', Baddr);
    formData.append('bmemo', Bmemo);
    formData.append('image', file);
    formData.append('mnick', Mnick);
    alert(file);

    await axios.post("http://localhost:5001/binsert", formData)
    .then(response => {
      alert('등록되었습니다.');
      navigate(0); // 페이지를 새로 고침
    })
    .catch(err => {
      console.error(err);
      alert('Error uploading file and data');
    });
  };

  const backToList = () => {
    navigate('/');
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <form onSubmit={saveMyuser} >          
	      	<table border="1">
          <tbody>
			  	<tr>
					<td>bname</td>
					<td><input type="text" name="bname" value={Bname} onChange={bnameHandler}></input></td>
			  	</tr>
          <tr>
					<td>bhp</td>
					<td><input type="text" name="bhp" value={Bhp} onChange={bhpHandler}></input></td>
			  	</tr>
          <tr>
					<td>baddr</td>
					<td><input type="text" name="baddr" value={Baddr} onChange={baddrHandler}></input></td>
			  	</tr>
          <tr>
					<td>bmemo</td>
					<td><textarea type="text" name="bmemo" value={Bmemo} onChange={bmemoHandler}></textarea></td>
			  	</tr>
          <tr>
					<td>bphoto</td>
					<td><input type="file" name="bphoto" onChange={onFileChange} /></td>
			  	</tr>
          <tr>
					<td>mnick</td>
					<td><input type="text" name="mnick" value={Mnick} onChange={mnickHandler}></input></td>
			  	</tr>  
			   	<tr>
					<td colSpan="2">
              <button type="submit">보내기</button>
              <button onClick={backToList}>취소</button>
          </td>				
			  	</tr>
          </tbody>
		  	</table>
      </form>
   
    </div>
  );
};

export default BakeryInsert;