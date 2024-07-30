import React, { useEffect } from 'react'
import { useModelsContext } from '../context/ModelsContext';
import styled from 'styled-components';

const CorrelationsTable = () => {
    const {companies, revCor, setRevCor, niCor, setNiCor, fcfCor, setFcfCor } = useModelsContext()
    useEffect(() => {
        if (companies.length > 1) {
          // -------------------------------revenue correlation to mc--------------------
          var sumX = companies.map((com) => com.mc).reduce((a, b) => a + b, 0);
          var sumY = companies.map((com) => com.rev).reduce((a, b) => a + b, 0);
          var sumXy = companies
            .map((com) => com.mc * com.rev)
            .reduce((a, b) => a + b, 0);
          var sumX2 = companies
            .map((com) => com.mc ** 2)
            .reduce((a, b) => a + b, 0);
          var sumY2 = companies
            .map((com) => com.rev ** 2)
            .reduce((a, b) => a + b, 0);
          var n = companies.length;
          var top = n * sumXy - sumX * sumY;
          var bottom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
          setRevCor(Number((top / bottom).toFixed(3)));
    
          //----------------------net income correlation ----------------
          var sumX = companies.map((com) => com.mc).reduce((a, b) => a + b, 0);
          var sumY = companies.map((com) => com.ni).reduce((a, b) => a + b, 0);
          var sumXy = companies
            .map((com) => com.mc * com.ni)
            .reduce((a, b) => a + b, 0);
          var sumX2 = companies
            .map((com) => com.mc ** 2)
            .reduce((a, b) => a + b, 0);
          var sumY2 = companies
            .map((com) => com.ni ** 2)
            .reduce((a, b) => a + b, 0);
          var n = companies.length;
          var top = n * sumXy - sumX * sumY;
          var bottom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
          setNiCor(Number((top / bottom).toFixed(3)));
    
          //---------------------fcf correlation -------------------
          var sumX = companies.map((com) => com.mc).reduce((a, b) => a + b, 0);
          var sumY = companies.map((com) => com.fcf).reduce((a, b) => a + b, 0);
          var sumXy = companies
            .map((com) => com.mc * com.fcf)
            .reduce((a, b) => a + b, 0);
          var sumX2 = companies
            .map((com) => com.mc ** 2)
            .reduce((a, b) => a + b, 0);
          var sumY2 = companies
            .map((com) => com.fcf ** 2)
            .reduce((a, b) => a + b, 0);
          var n = companies.length;
          var top = n * sumXy - sumX * sumY;
          var bottom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
          setFcfCor(Number((top / bottom).toFixed(3)));
        }
      }, [companies]);
  return (
    <CorrelationTableStyled>
        <caption>Correlation Matrix</caption>
        <thead>
            <tr>
                <th>Correlation</th>
                <th>Market Cap</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Revenue</td>
                <td>{revCor ? revCor : 0}</td>
            </tr>
            <tr>
                <td>Net Income</td>
                <td>{niCor ? niCor : 0}</td>
            </tr>
            <tr>
                <td>FCF</td>
                <td>{fcfCor ? fcfCor : 0}</td>
            </tr>
        </tbody>
    </CorrelationTableStyled>
  )
}

const  CorrelationTableStyled = styled.table`
    background: var(--red);
    border-radius: 7px;
    padding: 7px;
    margin-top: 20px;

    caption {
        color: var(--dark);
    }

    th, td {
        padding: 2px
    }

`

export default CorrelationsTable
