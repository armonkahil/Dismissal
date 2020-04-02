import React from 'react'
import { Row, Column, Container } from '../../Grid'
import Card from '../../Card'
import Dashboard from '../../DashboardCard'
import CardHeader from '../../CardHeader'
import ParentsContainer from '../parentsContainer'
import { List } from '../../List'
import StudentContainer from '../StudentContainer'
import Geolocated from '../../Geolocated'

const FamilyContainer = props => {
  return (
    <div>
      <Row styling='justify-content-center'>
        <Dashboard styling='border'>
          <CardHeader
            title={`The ${props.familyData.familyLastName} Family`}
          />
          <Container>
            <Row styling='row-cols-1 row-cols-md-2'>
              <Column styling='px-0'>
                <Card styling='guardianContainer'>
                  <CardHeader title='Guardians' />
                  <List styling='list-inline'>
                    {props.familyData.guardians ? (
                      props.familyData.guardians.map(
                        (parents, index) => (
                          <ParentsContainer
                            key={Math.floor(Math.random() * 1000 + 1)}
                            name={`${parents.firstName} ${parents.lastName}`}
                            work={parents.workPhone}
                            home={parents.homePhone}
                            cell={parents.cellPhone}
                            email={parents.email}
                            relation={parents.relation}
                          />
                        )
                      )
                    ) : (
                      <div className='text-center'>
                        <div className='spinner-border' role='status'>
                          <span className='sr-only'>Loading...</span>
                        </div>
                      </div>
                    )}
                  </List>
                </Card>
              </Column>
              <Column styling='px-0 mx-0'>
                <Card styling='studentCard'>
                  <CardHeader title='Students' />
                  <List styling='list-inline'>
                    {props.familyData.students ? (
                      props.familyData.students.map(
                        (students, index) => (
                          <StudentContainer
                            key={Math.floor(Math.random() * 1000 + 1)}
                            firstName={students.firstName}
                            middleName={students.middleName}
                            lastName={students.lastName}
                            suffix={
                              students.suffix ? students.suffix : ' '
                            }
                            gender={students.gender}
                            dob={students.dob}
                            gradeLevel={students.gradeLevel}
                          />
                        )
                      )
                    ) : (
                      <div className='text-center'>
                        <div className='spinner-border' role='status'>
                          <span className='sr-only'>Loading...</span>
                        </div>
                      </div>
                    )}
                  </List>
                </Card>
              </Column>
            </Row>
            <Row>
              <Card styling='card-body mx-0 px-0'>
                <CardHeader title='Send pick up status' />
                <Geolocated
                  name={props.familyData.familyLastName}
                  {...props}
                />
              </Card>
            </Row>
          </Container>
        </Dashboard>
      </Row>
    </div>
  )
}

export default FamilyContainer
