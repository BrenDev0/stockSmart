import React, {useEffect} from 'react'
import styled from 'styled-components'
import Layout from '../styles/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../components/Skeletons/LoadingPage'
import ValuationToolBar from '../components/ValuationToolBar'
import Table from '../components/Table'
import { useValuationContext } from '../context/ValuationContext'


const Valuation = () => {
    const { getUser, user, isLoading, setIsLoading, error } = useGlobalContext()
    const { financialData } = useValuationContext()
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
                return navigate('/login')
            }
        }, 2000)
    }, [user])
  
    return isLoading ? (
    <LoadingPage />
  ) : (
    <Layout>
        <ValuationStyled>
            <ValuationToolBar />
            {
                financialData.data.length > 0 &&  <Table />
            }
            
        </ValuationStyled>
    </Layout>
  )
}

const ValuationStyled = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
`

export default Valuation
