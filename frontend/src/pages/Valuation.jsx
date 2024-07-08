import React, {useEffect} from 'react'
import styled from 'styled-components'
import Layout from '../styles/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../components/Skeletons/LoadingPage'


const Valuation = () => {
    const { getUser, user, isLoading, setIsLoading } = useGlobalContext()
    const navigate = useNavigate()
    useEffect(() => {
        getUser();
        setTimeout(() => {
            if (user === null){
                return null;
            }
            if (user){
                setIsLoading(false)
            }
            if (!user){
                return navigate('login')
            }
        }, 2000)
    }, [user])
  
    return isLoading ? (
    <LoadingPage />
  ) : (
    <Layout>
        <ValuationStyled>

        </ValuationStyled>
    </Layout>
  )
}

const ValuationStyled = styled.div`
    width: 100%;
    height: 100%;
`

export default Valuation
