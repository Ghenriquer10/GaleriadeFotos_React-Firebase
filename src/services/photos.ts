import {Photo} from '../types/photo'
import { storage} from '../libs/firebase';
import {ref, listAll, getDownloadURL, uploadBytes} from 'firebase/storage'
import {v4 as createId} from 'uuid';


// Função que irá obter todas as fotos do firebase
export const getAll = async () => {
    let list : Photo[] = [];
    
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

// Função responsável por grantir que o arquivo é do tipo imagem e en seguida disponibiliza-la no storage do firebase
export const uploadImage = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){
        // Criando um nome aleatório para imagem
        let randomName = createId();

        // Adquirindo a referência do storage do usuário junto a pasta e o nome randômico criado
        let newFile = ref(storage, `images/${randomName}`);

        // Realizando o upload da imagem junto a refêrencia montada na variável newFile criada na linha anterior
        let upload = await uploadBytes(newFile, file);
        // Na variável upload, após a imagem enviada, tem-se como resposta dados como a url da imagem junto ao nome
        let photoUrl = await getDownloadURL(upload.ref);

        // Retornando o tipo Photo com o nome e url da imagem
        return{name: upload.ref.name, url: photoUrl} as Photo;
        

    }else{
        return new Error('Tipo de arquivo não permitido');
    }
}