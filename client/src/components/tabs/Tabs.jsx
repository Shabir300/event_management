import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './tabs.scss';

function UncontrolledExample() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3 tabs"
    >
      <Tab eventKey="home" title="Account Info">
        A
      </Tab>
      <Tab eventKey="profile" title=" Change Email">
        C
      </Tab>
      <Tab eventKey="contact" title="Password" >
        P
      </Tab>
    </Tabs>
  );
}

export default UncontrolledExample;