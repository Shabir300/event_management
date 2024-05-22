import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './breadCrumbs.scss'

function BreadcrumbExample({currentForm, setCurrentForm}) {
  const isActive = (form) => currentForm === form;
  console.log('active', currentForm)
  return (
    // <Breadcrumb>
    //   <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
    //   <Breadcrumb.Item href="">
    //     Library
    //   </Breadcrumb.Item>
    //   <Breadcrumb.Item active>Data</Breadcrumb.Item>
    // </Breadcrumb>
    <div className='breadcrumbs'>
      <div 
      className={`${isActive('Edit')? `active`: ''}`}
      onClick={(e) => setCurrentForm('Edit')}
      >Edit</div>
      <div 
      className={`${isActive('Banner')? `active`: ''}`}
      onClick={(e) => setCurrentForm('Banner')}
      >Banner</div>
      <div 
      className={`${isActive('Ticketing')? `active`: ''}`}
      onClick={(e) => setCurrentForm('Ticketing')}
      >Ticketing</div>

    </div>
  );
}

export default BreadcrumbExample;