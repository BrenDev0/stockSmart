import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Nunito", sans-serif;
    color: #F4F3EE;
    font-size: 1.2vw;
    text-decoration: none;
    list-style: none;
    
    
   

}

body, html {
   // background: rgba(237, 242, 244, .9);
   background: #F4F3EE;
   width: 100%;
   height: 100%;

   
}

#root {
  height: 100%;
}

:root {
  --red: rgba(239, 35, 60, 0.75);
  --light: rgba(141, 153, 174, 0.8);
  --dark: rgba(43, 45, 66, 0.8);
  --white:  #F4F3EE;
}

.skeleton {
  opacity: .7;
  animation: skeleton-loading 1.5s linear infinite alternate
}
@keyframes skeleton-loading {
  0% {
    background: hsl(200, 20%, 75%);
  }
  100% {
    background: hsl(200, 20%, 95%);
  }
  
}



input {
    color: rgb(43, 45, 66);
    border-radius: 10px;
    height: 35;
    text-align: center;
    border: none;
    
  }

  input:focus{
    outline: none;
  }

  
  

  


`;

export default GlobalStyle;
