import {React, useEffect} from 'react'
import styled from "styled-components"
import Layout from '../styles/Layout';
import { useGlobalContext } from '../context/GlobalContext';


const WatchlistsPage = () => {
    const { user, getUser } = useGlobalContext()
    
    useEffect(() => {
        getUser();
        setTimeout(() => {
          if (user) {
            return setIsLoading(false);
          }
          else if (!user) {
            return navigate("/login");
          }
          else{
            return null;
          }
        }, 2000);
      }, [user]);
  return (
    <Layout>
        <WatchlistsStyled>

        </WatchlistsStyled>
    </Layout>
  )
}

const WatchlistsStyled = styled.div``

export default WatchlistsPage
