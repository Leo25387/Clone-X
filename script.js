document.addEventListener('DOMContentLoaded', () => {
    const postContentInput = document.getElementById('post-content');
    const usernameInput = document.getElementById('username-input');
    const postButton = document.getElementById('post-button');
    const postList = document.getElementById('post-list');
    const searchInput = document.getElementById('search-input');
    const userList = document.getElementById('user-list');
    const profileSection = document.getElementById('profile');
    const profileAvatar = document.getElementById('profile-avatar');
    const profileUsername = document.getElementById('profile-username');
    const profileBio = document.getElementById('profile-bio');
    const profilePosts = document.getElementById('profile-posts');
    const backToUsersButton = document.getElementById('back-to-users');
    const trendsList = document.querySelector('.trends ul');
    const notificationsLink = document.getElementById('notifications-link');
    const notificationOverlay = document.getElementById('notification-overlay');
    const notificationList = document.getElementById('notification-list');
    const closeNotificationsButton = document.getElementById('close-notifications');
    const bookmarksLink = document.getElementById('bookmarks-link');

    // --- Données améliorées ---
    const realisticUsernames = [
        'TechGuru2023', 'CodeNinja88', 'DataQueen', 'WebDevPro', 'PixelPusher',
        'DigitalNomad', 'CoffeeCoder', 'AIWhisperer', 'CloudArchitect', 'UXChampion'
    ];

    const realisticMessages = [
        "Just finished an amazing coding session! Feeling inspired.",
        "Exploring the latest trends in AI. So much to learn!",
        "Debugging is my cardio. Anyone else relate?",
        "Sharing my thoughts on the future of web development. Check it out!",
        "Working on a new UI/UX design. Excited to see it come to life.",
        "The best view comes after the hardest climb.",
        "Enjoying a cup of coffee while coding.",
        "Learning new things is always fun.",
        "Just deployed a new website! Check it out!",
        "Working on a machine learning project."
    ];

    const users = [
        { id: 1, username: 'ElonMusk', bio: 'Entrepreneur, Innovator', avatar: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/13/11/elon-musk.jpg?width=1200' },
        { id: 2, username: 'BillGates', bio: 'Philanthropist, Microsoft Founder', avatar: 'https://assets.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY2MzU0NDU0Mzc0MzE4MzAx/bill-gates-gettyimages-955967262.jpg' },
        { id: 3, username: 'JeffBezos', bio: 'Amazon Founder, Space Enthusiast', avatar: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/07/23/10/jeff-bezos.jpg?width=1200' }
    ];


    // --- Fonctions utilitaires ---
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function generateRandomPost() {
        return {
            id: Date.now(),
            username: getRandomElement(realisticUsernames),
            content: getRandomElement(realisticMessages),
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` // Générateur d'avatars aléatoires
        };
    }

    // Fonction pour récupérer les posts depuis localStorage
    function getPosts() {
        const posts = localStorage.getItem('posts');
        return posts ? JSON.parse(posts) : [];
    }

    // Fonction pour sauvegarder les posts dans localStorage
    function savePosts(posts) {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

        // Fonction pour récupérer les signets depuis localStorage
    function getBookmarks() {
        const bookmarks = localStorage.getItem('bookmarks');
        return bookmarks ? JSON.parse(bookmarks) : [];
    }

    // Fonction pour sauvegarder les signets dans localStorage
    function saveBookmarks(bookmarks) {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Fonction pour afficher un post
    function displayPost(post, isBookmarked = false) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <div class="profile-picture">
                <img src="${post.avatar}" alt="Profile Picture">
            </div>
            <div class="post-content">
                <div class="username">${post.username}</div>
                <p>${post.content}</p>
                <div class="post-options">
                    <i class="far fa-comment"></i>
                    <i class="fas fa-retweet retweet-button" data-post-id="${post.id}">
                        <span class="retweet-count">${post.retweetCount || 0}</span>
                    </i>
                    <i class="far fa-heart like-button" data-post-id="${post.id}">
                        <span class="like-count">${post.likeCount || 0}</span>
                    </i>
                    <i class="far fa-bookmark bookmark-button ${isBookmarked ? 'bookmarked' : ''}" data-post-id="${post.id}"></i>
                </div>
                <div class="replies"></div>
            </div>
        `;
        postList.insertBefore(postDiv, postList.firstChild);

        // Ajout des gestionnaires d'événements pour les likes, retweets et signets
        const likeButton = postDiv.querySelector('.like-button');
        const retweetButton = postDiv.querySelector('.retweet-button');
        const bookmarkButton = postDiv.querySelector('.bookmark-button');

        likeButton.addEventListener('click', () => {
            updateLikeCount(post.id, likeButton);
        });

        retweetButton.addEventListener('click', () => {
            updateRetweetCount(post.id, retweetButton);
        });

        bookmarkButton.addEventListener('click', () => {
            toggleBookmark(post.id, bookmarkButton);
        });
    }

    // Fonction pour mettre à jour le nombre de likes
    function updateLikeCount(postId, likeButton) {
        const posts = getPosts();
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likeCount = (post.likeCount || 0) + 1;
            savePosts(posts);
            likeButton.querySelector('.like-count').textContent = post.likeCount;
            likeButton.classList.add('liked'); // Ajoute une classe pour changer la couleur
        }
    }

    // Fonction pour mettre à jour le nombre de retweets
    function updateRetweetCount(postId, retweetButton) {
        const posts = getPosts();
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.retweetCount = (post.retweetCount || 0) + 1;
            savePosts(posts);
            retweetButton.querySelector('.retweet-count').textContent = post.retweetCount;
            retweetButton.classList.add('retweeted'); // Ajoute une classe pour changer la couleur
        }
    }

        // Fonction pour gérer l'ajout/suppression des signets
    function toggleBookmark(postId, bookmarkButton) {
        let bookmarks = getBookmarks();
        const isBookmarked = bookmarks.includes(postId);

        if (isBookmarked) {
            bookmarks = bookmarks.filter(id => id !== postId);
            bookmarkButton.classList.remove('bookmarked');
        } else {
            bookmarks.push(postId);
            bookmarkButton.classList.add('bookmarked');
        }

        saveBookmarks(bookmarks);
    }

    // Fonction pour afficher tous les posts
    function displayAllPosts(filterBookmarks = false) {
        postList.innerHTML = '';
        const posts = getPosts();
        let bookmarks = getBookmarks();

        if (filterBookmarks) {
            posts.forEach(post => {
                if (bookmarks.includes(post.id)) {
                    displayPost(post, true);
                }
            });
        } else {
            posts.forEach(post => {
                displayPost(post, bookmarks.includes(post.id));
            });
        }
    }

    // Fonction pour afficher un utilisateur
    function displayUser(user) {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
            <img src="${user.avatar}" alt="Avatar">
            <div>
                <strong>${user.username}</strong>
                <span>${user.bio}</span>
            </div>
        `;
        userDiv.addEventListener('click', () => showUserProfile(user.id));
        userList.appendChild(userDiv);
    }

    // Fonction pour afficher tous les utilisateurs
    function displayAllUsers() {
        userList.innerHTML = '';
        users.forEach(displayUser);
    }

    // Fonction pour ajouter un nouveau post
    function addPost() {
        const content = postContentInput.value.trim();
        const username = usernameInput.value.trim() || 'Anonyme'; // Nom d'utilisateur par défaut
        if (content !== '') {
            const posts = getPosts();
            const newPost = {
                id: Date.now(),
                username: username,
                content: content,
                avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
            };
            posts.push(newPost);
            savePosts(posts);
            displayPost(newPost);
            postContentInput.value = '';
            usernameInput.value = '';
        }
    }

    // Fonction pour filtrer les posts par mot-clé
    function filterPosts(keyword) {
        postList.innerHTML = '';
        const posts = getPosts();
        let bookmarks = getBookmarks();
        const filteredPosts = posts.filter(post =>
            post.content.toLowerCase().includes(keyword.toLowerCase()) ||
            post.username.toLowerCase().includes(keyword.toLowerCase())
        );
        filteredPosts.forEach(post => {
             displayPost(post, bookmarks.includes(post.id));
        });
    }

    // Fonction pour afficher le profil d'un utilisateur
    function showUserProfile(userId) {
        const user = users.find(user => user.id === userId);
        if (user) {
            document.getElementById('profile-banner').src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            profileAvatar.src = user.avatar;
            profileUsername.textContent = user.username;
            profileBio.textContent = user.bio;

            // Afficher les posts de l'utilisateur (simulé)
            profilePosts.innerHTML = '';
            const posts = getPosts();
            let bookmarks = getBookmarks();
            const userPosts = posts.filter(post => post.username === user.username);
            userPosts.forEach(post => {
                displayPost(post, bookmarks.includes(post.id));
            });

            // Afficher la section profil
            document.querySelector('.container').classList.add('blur'); // Ajouter un effet de flou
            profileSection.style.display = 'flex';
        }
    }

        // Fonction pour gérer les clics sur les tendances
    function handleTrendClick(event) {
        event.preventDefault();
        const trend = event.target.dataset.trend;
        filterPosts(trend);
    }

     // Fonction pour générer des notifications fictives
    function generateNotifications() {
        const notifications = [
            { id: 1, message: 'JohnDoe a aimé votre tweet.' },
            { id: 2, message: 'JaneSmith vous a suivi.' },
            { id: 3, message: 'PeterJones a retweeté votre tweet.' },
            { id: 4, message: 'Votre tweet a atteint 100 likes.' }
        ];
        return notifications;
    }

    // Fonction pour afficher les notifications
    function displayNotifications() {
        notificationList.innerHTML = '';
        const notifications = generateNotifications();
        notifications.forEach(notification => {
            const notificationItem = document.createElement('li');
            notificationItem.textContent = notification.message;
            notificationList.appendChild(notificationItem);
        });
    }

    // --- Rafraîchissement automatique des posts ---
    function refreshPosts() {
        const newPost = generateRandomPost();
        const posts = getPosts();
        posts.push(newPost); // Ajoute le nouveau post au tableau
        savePosts(posts); // Sauvegarde le tableau mis à jour
        displayAllPosts(); // Réaffiche tous les posts
    }

    // Rafraîchir les posts toutes les 5 secondes (5000 ms)
    setInterval(refreshPosts, 5000);

    // Initialisation
    displayAllPosts();
    displayAllUsers();

    // Événements
    postButton.addEventListener('click', addPost);

    searchInput.addEventListener('input', () => {
        filterPosts(searchInput.value);
    });

    backToUsersButton.addEventListener('click', () => {
        profileSection.style.display = 'none';
        document.querySelector('.container').classList.remove('blur');
    });

    // Ajout d'écouteurs d'événements aux tendances
    trendsList.addEventListener('click', handleTrendClick);

     // Gestion du clic sur l'icône de notifications
    notificationsLink.addEventListener('click', (event) => {
        event.preventDefault();
        displayNotifications();
        notificationOverlay.style.display = 'flex';
    });

    // Gestion du clic sur le bouton "Fermer" des notifications
    closeNotificationsButton.addEventListener('click', () => {
        notificationOverlay.style.display = 'none';
    });

    // Gestion du clic sur l'onglet "Signets"
    bookmarksLink.addEventListener('click', (event) => {
        event.preventDefault();
        displayAllPosts(true); // Afficher uniquement les signets
        // Réinitialiser le titre de la timeline à "Signets"
        document.querySelector('.timeline-header h2').textContent = 'Signets';
    });

    // Écouteur d'événement pour revenir à l'affichage de tous les posts
    document.querySelector('.sidebar [href="#"]').addEventListener('click', (event) => {
        event.preventDefault();
        displayAllPosts(); // Afficher tous les posts
        // Réinitialiser le titre de la timeline à "Accueil"
        document.querySelector('.timeline-header h2').textContent = 'Accueil';
    });
});