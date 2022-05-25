import React from 'react'
import styled from 'styled-components'

const StatisticsCard = ({DayData}) => {
    console.log("DayData", DayData.completedTasksCount)
    return (
        <Wrapper>
            <Section>
                <Card>
                    <Figure>
                        {DayData.tasksCount ? DayData.tasksCount : 0}
                    </Figure>
                    <Label>
                        All tasks
                    </Label>
                </Card>
                <Card>
                    <Figure>
                        {DayData.completedTasksCount ? DayData.completedTasksCount : 0}
                    </Figure>
                    <Label>
                        Completed
                    </Label>
                </Card>
                <Card>
                    <Figure>
                        {DayData.percentCompleted ? DayData.percentCompleted : 0}%
                    </Figure>
                    <Label>
                        Ratio completed
                    </Label>
                </Card>
            </Section>
            
            <Separator />
        
            <Section>
                <Card>
                    <Figure>
                        10
                    </Figure>
                    <Label>
                        Important
                    </Label>
                </Card>
                <Card>
                    <Figure>
                        3
                    </Figure>
                    <Label>
                        Urgent
                    </Label>
                </Card>
                <Card>
                    <Figure>
                        1
                    </Figure>
                    <Label>
                        Medium
                    </Label>
                </Card>

                <Card>
                    <Figure>
                        1
                    </Figure>
                    <Label>
                        High
                    </Label>
                </Card>
            </Section>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`


const Section = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 48%;
    max-width: 600px;
`

const Separator = styled.div`
    height: 6rem;
    width: 1px;
    background-color: #ffffff36;
    `

const Card = styled.div`
`

const Figure = styled.div`
    font-size: 2.3rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 5px;
`

const Label = styled.div`
    font-weight: 200;
    text-align: center;
`

export default StatisticsCard