import { useState } from "react"
import styled from "styled-components"

import { Header } from "../organismos/Header"
import { Card } from "../atomos/Card"


export const DashboardTemplate = () => {
    const [state, setState] = useState(false)
    return (
        <Container>
            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }} />
            </header>
            <section className="area1">
                <div className="Cards">
                    <Card>Terminales portátiles</Card>
                    <Card>Lectora</Card>
                    <Card>Relojes </Card>
                    <Card>Impresoras</Card>
                </div>

            </section>
            <section className="area2"></section>
            <section className="main"></section>
        </Container>
    )
}


const Container = styled.div`
    min-height: 100vh;
    padding: 15px;
    width: 100%;
    background: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    display: grid;
    grid-template:
        "header" 100px
        "area1" auto
        "area2" 50px
        "main" auto;

    .header {
        grid-area: header;
        background-color: rgba(103, 93, 241, 0.14);
        align-items: center;
        display: flex;
    }
    .area1 {
        grid-area: area1;
        background-color: rgba(229, 67, 26, 0.14);
        display: flex;
        /* align-items: center; */
        .Cards {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
            width: 100%;
            margin: 20px 10px;
            justify-content: center;
            align-content: flex-start;
        }
    }
    .area2 {
        grid-area: area2;
        background-color: rgba(77, 237, 106, 0.14);
        display: flex;
        align-items: center;
    }
    .main {
        grid-area: main;
        background-color: rgba(179, 46, 241, 0.14);
    }
`
