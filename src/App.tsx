import * as C from './App.styles';
import * as Photos from './services/photos';
import {Photo} from './types/photo'
import {useState, useEffect} from 'react'


const App = () => {

  const[loading, setLoading] = useState(false);
  const[photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {

    async function loadPhotos(){
      setLoading(true);
      setPhotos(await Photos.getAll())
      setLoading(false);
    }

    loadPhotos()

  }, [])

  return(
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>
          {/* Área Upload Fotos*/}
          {/* Lista Imagens*/}
          {loading &&
            <C.ScreenWarning>
              <div className='emoji'></div>
              <div>Carregando...</div>
            </C.ScreenWarning>
          }
      </C.Area>
    </C.Container>
  )
}

export default App;