import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const BakeryInsert = () => {
 
  const navigate = useNavigate();  
  const [Bhp, SetBhp] = useState("");
  const [Bname, SetBname] = useState("");
  const [Baddr, SetBaddr] = useState("");
  const [Bmemo, SetBmemo] = useState("");

  const bhpHandler = (e) => {e.preventDefault();SetBhp(e.target.value);};
  const bnameHandler = (e) => {e.preventDefault();SetBname(e.target.value);};
  const baddrHandler = (e) => {e.preventDefault();SetBaddr(e.target.value);};
  const bmemoHandler = (e) => {e.preventDefault();SetBmemo(e.target.value);};

  const [file, setFile] = useState(null);
  const onFileChange = (e) => {setFile(e.target.files[0]);};

  const saveMyuser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bname', Bname);
    formData.append('bhp', Bhp);
    formData.append('baddr', Baddr);
    formData.append('bmemo', Bmemo);
    formData.append('image', file);

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
    <div style={{ padding: 100, fontSize: 20}}>
      <form onSubmit={saveMyuser}>
	      	<table border="1">
          <tbody>
			  	<tr>
					<td>bname</td>
					<td><input type="text" name="bname" value={Bname} onChange={bnameHandler}></input></td>
			  	</tr><br/>
          <tr>
					<td>bhp</td>
					<td><input type="text" name="bhp" value={Bhp} onChange={bhpHandler}></input></td>
			  	</tr><br/>
          <tr>
					<td>baddr</td>
					<td><input type="text" name="baddr" value={Baddr} onChange={baddrHandler}></input></td>
			  	</tr><br/>
          <tr>
					<td>bmemo</td>
					<td><textarea type="text" name="bmemo" value={Bmemo} onChange={bmemoHandler}></textarea></td>
			  	</tr><br/>
          <tr>
					<td>bphoto</td>
					<td><input type="file" name="bphoto" onChange={onFileChange} /></td>
			  	</tr><br/>
			   	<tr>
					<td colSpan="2">
              <button type="submit">보내기</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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