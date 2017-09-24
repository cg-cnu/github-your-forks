
let text;

function getForksElement(text) {
    // Verify that the element exists and it's still valid
    // otherwise, create it
    if (document.body.contains(text)) {
        return text;
    }

    // If the layout of the page changes, we'll have to change this location.
    // We should make sure that we do not accidentally cause errors here.
    const repoName = document.querySelector('.repohead-details-container .public');
    if (repoName) {
        try {
            text = document.createElement('span');
            
            // Stealing the styling from GitHub fork-info
            text.classList.add('fork-flag', 'lovely-forks-addon');

            repoName.append(text);

            return text;
        } catch (err) {
            console.error( 'Error appending data to DOM', err);
        }
    } else {
        console.warn( 'Looks like the layout of the GitHub page has changed.' );
    }
}

function emptyElem(elem) {
    elem.textContent = ''; // How jQuery does it
}

function showDetails(user, repo, text) {

    const forkA = document.createElement('a');

    forkA.href = `https://github.com/${user}/${repo}/`;
    forkA.append(`${user}/${repo}`);

    text.append('forked to ', forkA )

}

function safeUpdateDOM(user, repo) {

    // Get the stored version or create it if it doesn't exist
    const text = getForksElement();
    // console.log(text);
    emptyElem(text);
    showDetails(user, repo, text)
    console.log(text);
    // action(text);

}

async function runFor(user, repo) {
    try {
        const url = `https://github.com/${user}/${repo}/`
        response = await fetch(url)
        if (response.status !== 200){
            return console.warn('Looks like something is wrong.');
        }
        safeUpdateDOM(user, repo)
        
    } catch (err) {
        console.error('Could not run for ', `${user}/${repo}`,
                      'Exception: ', err);
    }
}

/* Script execution */

// get the user and repo
const [ , user, repo] = window.location.pathname.split('/');

if (user, repo) {
    // TODO: get the current user ?
    viewer = 'cg-cnu';

    if (user !== viewer){
        runFor(viewer, repo);
    };
}