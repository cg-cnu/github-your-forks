
let forksContainer;

function getForksContainer(forksContainer) {
    // if the element exists empty and return it
    if (document.body.contains(forksContainer)) {
        forksContainer.textContent = '';        
        return forksContainer;
    }

    // else create a new element and return it
    const repoName = document.querySelector('.repohead-details-container .public');
    if (repoName) {
        try {
            forksContainer = document.createElement('span');
            forksContainer.classList.add('fork-flag', 'lovely-forks-addon');
            repoName.append(forksContainer);
            return forksContainer;

        } catch (err) {
            console.error( 'Error appending data to DOM', err);
        }
    } else {
        console.warn( 'Looks like the layout of the GitHub page has changed.' );
    }
}

function createForkElement(user, repo) {

    const forkElement = document.createElement('a');

    forkElement.href = `https://github.com/${user}/${repo}/`;
    forkElement.append(`${user}/${repo}`);

    return forkElement

}

async function getForkUrl(user, repo) {
    try {
        const url = `https://github.com/${user}/${repo}/`
        response = await fetch(url)
        if (response.status !== 200){
            console.warn('Looks like something is wrong.');
            return;
        }
        return url;
    } catch (err) {
        console.error('Could not run for ', `${user}/${repo}`,
                      'Exception: ', err);
        return;
    }
}

async function main(user, repo){

    // get current viewer name
    viewer = document.querySelector('.css-truncate-target').innerText
    // if user and viewer are same;
    if (user !== viewer){
        // get the fork url 
        let forkUrl = await getForkUrl(viewer, repo);
        if(forkUrl){
            // get the fork element and container and add
            let forkElement = createForkElement(viewer, repo)        
            forksContainer = getForksContainer();
            forksContainer.append('forked to ', forkElement )       
        }
    }
}

// get the user and repo
const [ , user, repo] = window.location.pathname.split('/');

if( user, repo){
    main(user, repo)
}