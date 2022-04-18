import { Fragment } from 'react'
import Header from './components/Header'
import FileUploader from './components/FileUploader'

const App = () => {
  return (
    <Fragment>
      <Header />
      <FileUploader />
    </Fragment>
  )
}

export default App