import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Nunito", sans-serif;
    color: #F4F3EE;
    font-size: 100%;
   

}

body{
   // background: rgba(237, 242, 244, .9);
   background: #F4F3EE;
   
}


input {
    color: rgb(43, 45, 66);
    border-radius: 10px;
    height: 30px;
    text-align: center;
    
  }


`;

export default GlobalStyle;
