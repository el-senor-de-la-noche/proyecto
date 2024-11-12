import { auth,  db } from './firebase-config.js';
import { addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Create a welcome message
async function createWelcomeMessage() {
    try {
        await addDoc(collection(db, 'chat'), {
            uid: 'system',
            username: 'Admin',
            message: 'Bienvenido al chat global de Red One. Comparte tus ideas y archivos con la comunidad.',
            fileUrl: '',
            timestamp: new Date()
        });
        console.log('Mensaje de bienvenida creado exitosamente.');
    } catch (error) {
        console.error('Error al crear mensaje de bienvenida:', error);
    }
}

// Check if the chat collection is empty and add the welcome message
async function checkAndAddWelcomeMessage() {
    try {
        const chatCollection = collection(db, 'chat');
        const chatSnapshot = await getDocs(chatCollection);
        if (chatSnapshot.empty) {
            await createWelcomeMessage();
        } else {
            console.log('El mensaje de bienvenida ya ha sido creado.');
        }
    } catch (error) {
        console.error('Error al verificar y agregar mensaje de bienvenida:', error);
    }
}

checkAndAddWelcomeMessage();
