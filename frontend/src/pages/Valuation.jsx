import React, {useEffect} from 'react'
import styled from 'styled-components'
import Layout from '../styles/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../components/Skeletons/LoadingPage'
import ValuationToolBar from '../components/ValuationToolBar'
import Table from '../components/Table'
import { useValuationContext } from '../context/ValuationContext'
import CompanyValuation from '../components/CompanyValuation'


const Valuation = () => {
    const { getUser, user, isLoading, setIsLoading, error } = useGlobalContext()
    const { statement } = useValuationContext()
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
                statement.data.length > 0 &&  
                <div className='valuation-tools'>
                    <Table />
                    <CompanyValuation />
                </div>
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

    .valuation-tools {
        display: flex;
        flex-direction: column;
        
    }
`

export default Valuation
