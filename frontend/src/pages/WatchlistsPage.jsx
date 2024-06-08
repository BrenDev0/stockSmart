import {React, useEffect} from 'react'
import styled from "styled-components"
import Layout from '../styles/Layout';
import { useGlobalContext } from '../context/GlobalContext';


const WatchlistsPage = () => {
    const { user, getUser } = useGlobalContext()
    
    useEffect(() => {
        getUser();
        setTimeout(() => {
          if (user === null) {
            return null;
          }
          if (user) {
            return setIsLoading(false);
          }
          if (!user) {
            return navigate("/login");
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
