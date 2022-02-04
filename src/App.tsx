import * as C from './App.styles';
import * as Photos from './services/photos';
import {Photo} from './types/photo'
import {useState, useEffect, FormEvent} from 'react'
import {PhotoItem} from './components/PhotoItem'
import { toast } from 'react-toastify';

const App = () => {

  // State para o carregamento das imagens
  const[loading, setLoading] = useState(false);
  // State onde serão guardados todas as imagens carregadas do firebase
  const[photos, setPhotos] = useState<Photo[]>([]);
  // State para o carregamento de uma nova imagem no firebase 
  const [uploading, setUploading] = useState(false); 

  // Primeiro carregamento do projeto fará com que inicie o useEffect, com isso
  // será carregada a função que carregará a galeria de imagens do firebase
  useEffect(() => {

    async function loadPhotos(){
      setLoading(true);
      setPhotos(await Photos.getAll())
      setLoading(false);
    }

    loadPhotos()

  }, [])

  // Função resposável por realizar o upload da imagem 
  const HandleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Pegando todos os dados necessários da imagem
    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File; 

    // Verificando se existem dados no arquivo enviado
    if(file && file.size > 0){
      //Caso tenha de fato um arquivo inicia-se o carregamento na tela
      setUploading(true);
      
      // Chamando função resposável por fazer o upload da imagem no storage do firebase
      let result = await Photos.uploadImage(file);
      // Caso o resultado retornado pela função seja istanciado como um erro, o mesmo é exibido para o usuário
      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`)
      }else{

        // Caso não seja retornado um erro, é adquirido o state com todas as imagens atuais já contidas através do spread,
        // atualizando o state com a nova imagem e disponibilizando ao usuário
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
          // Criando a lista de imagens, fazendo um map de cada uma
            <C.PhotoList>
              {photos.map((item, index) =>(
                // Componente resposável por cada imagem
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