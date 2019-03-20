const db = firebase.firestore();
const wall = document.getElementById('vista');
const createPost= document.getElementById('create-post');

(function(){
    _.controlador('firebase', {
        auth: firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                uid = user.uid;
                db.collection('posts').onSnapshot(snapshot => {
                    wall.innerHTML = '';
                printPost(snapshot.docs);
            });
            creatingPost();
            } else {
                uid = null;
            window.location.replace('./index.html');
            }
        }),

    })
})();

const printPost = (data)=>{
    data.forEach(doc => {
        let post = doc.data();
        let toPrint = `
        <article class="post">
        
        <p>Categoría: ${post.title}</p>
        <p>Post: ${post.content}</p>
        </article>
        `;
        wall.insertAdjacentHTML('beforeend', toPrint);
    });
}

const creatingPost = ()=>{
    createPost.addEventListener('submit', (e)=>{
        e.preventDefault();
        db.collection('posts').add({
            content:createPost['content'].value,
            title: createPost['title'].value
           
        }).then(()=>{
            createPost.reset();
        }).catch(err =>{
            console.log(err.message);
        });
        
    })
}
