import {Photo} from '../types/photo'
import { storage} from '../libs/firebase';
import {ref, listAll, getDownloadURL, uploadBytes} from 'firebase/storage'
import {v4 as createId} from 'uuid'

export const getAll = async () => {
    let list: Photo[] = [];
    
    // Criando referência da pasta salva com o nome IMAGES no storage do firebase
    const imagesFolder = ref(storage, "images");
    
    // Lendo os arquivos que foram encontrando na pasta referida
    const photoList = listAll(imagesFolder);
    
    // Fazendo um LOOP em cada um dos arquivos na pasta
    for ( let i in (await photoList).items){
        // Criando uma URL de download para cada imagem encontrada na pasta
        let photoUrl = await getDownloadURL((await photoList).items[i]);
        
        list.push({
            name: (await photoList).items[i].name,
            url: photoUrl
        })
    } 
    return list;
}

export const uploadImage = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){

        let randomName = createId();
        let newFile = ref(storage, `images/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return{
            name: upload.ref.name, url: photoUrl
        } as Photo;


    }else{
        return new Error('Tipo de arquivo não permitido');
    }
}