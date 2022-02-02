import * as C from './App.styles';
import * as Photos from './services/photos';
import {Photo} from './types/photo'
import {useState, useEffect, FormEvent} from 'react'
import {PhotoItem} from './components/PhotoItem'
import { toast } from 'react-toastify';

const App = () => {

  const[loading, setLoading] = useState(false);
  const[photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false); 

  useEffect(() => {

    async function loadPhotos(){
      setLoading(true);
      setPhotos(await Photos.getAll())
      setLoading(false);
    }

    loadPhotos()

  }, [])

  const HandleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File; 

    if(file && file.size > 0){
      setUploading(true);
      // Fazendo o uploading da imagem
      let result = await Photos.uploadImage(file);
      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`)
      }else{
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList)
        toast.info('Deu certo');
        setUploading(false);
      }
    }
  }

  return(
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>
          {/* Área Upload Fotos*/}

            <C.UploadForm onSubmit={HandleFormSubmit}>
              <input type="file" name="image" />
              {uploading &&
                <div className='uploading'>Carregando...</div>
              }
              <input type='submit' value='Enviar'/>
              
            </C.UploadForm>

          {/* Lista Imagens*/}
          {loading &&
            <C.ScreenWarning>
              <div className='emoji'>🤚</div>
              <div>Carregando...</div>
            </C.ScreenWarning>
          }

          {!loading && photos.length > 0 &&
            <C.PhotoList>
              {photos.map((item, index) =>(
                <PhotoItem key={index} url={item.url} name={item.name}/>
              ))}
            </C.PhotoList>
          }

          <C.Header>
            {!loading && photos.length === 0 &&
            <C.ScreenWarning>
              <div className='emoji'>😭</div>
              <div>Não há fotos cadastradas...</div>
            </C.ScreenWarning>
            }
          </C.Header>
      </C.Area>
    </C.Container>
  )
}

export default App;