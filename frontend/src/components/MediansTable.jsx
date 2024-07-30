import React, { useEffect } from 'react'
import { useModelsContext } from '../context/ModelsContext'
import styled from 'styled-components'


const MediansTable = () => {
    const { companies, medianPs, setMedianPs, medianPe, setMedianPe, medianPfcf, setMedianPfcf } = useModelsContext()
    useEffect(() => {
        if (companies.length > 0) {
          //---------------------median pe ------------------
          let pe = companies.map((com) => com.pe).sort((a, b) => a - b);
    
          if (pe.length % 2 !== 0) {
            let place = (pe.length + 1) / 2;
            setMedianPe(Number(pe[place - 1].toFixed(2)));
          } else {
            let place1 = pe.length / 2;
            let place2 = place1 + 1;
    
            setMedianPe(Number(((pe[place1 - 1] + pe[place2 - 1]) / 2).toFixed(2)));
          }
    
          //-----------------median ps------------------------
    
          let ps = companies.map((com) => com.ps).sort((a, b) => a - b);
    
          if (ps.length % 2 !== 0) {
            let place = (ps.length + 1) / 2;
    
            setMedianPs(Number(ps[place - 1].toFixed(2)));
          } else {
            let place1 = ps.length / 2;
            let place2 = place1 + 1;
    
            setMedianPs(Number(((ps[place1 - 1] + ps[place2 - 1]) / 2).toFixed(2)));
          }
    
          //----------------------median pfcf ---------------
          let pfcf = companies.map((com) => com.pfcf).sort((a, b) => a - b);
          if (pfcf.length % 2 !== 0) {
            let place = (pfcf.length + 1) / 2;
            setMedianPfcf(Number(pfcf[place - 1].toFixed(2)));
          } else {
            let place1 = pfcf.length / 2;
            let place2 = place1 + 1;
    
            setMedianPfcf(
              Number(((pfcf[place1 - 1] + pfcf[place2 - 1]) / 2).toFixed(2))
            );
          }
        }
        else {
          setMedianPs()
          setMedianPe()
          setMedianPfcf()
        }
      }, [companies]);
  return (
    <MedianTableStyled>
        <caption>Medians</caption>
        <thead>
            <tr>
                <th>PS</th>
                <th>Pe</th>
                <th>Pfcf</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{medianPs ? medianPs : 0}</td>
                <td>{medianPe ? medianPe :  0}</td>
                <td>{medianPfcf? medianPfcf : 0}</td>
            </tr>
        </tbody>
    </MedianTableStyled>
  )
}

const MedianTableStyled = styled.table`
    background: var(--red);
    border-radius: 7px;
    padding: 7px;
    margin-top: 20px;

    caption {
        color: var(--dark);
    }

    th, td {
        font-size: 1rem;
        padding: 5px;
    }

   
`

export default MediansTable
