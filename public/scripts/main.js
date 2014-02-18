
document.getElementById('editArticleBody').addEventListener('keyup', function () {
    document.querySelector('.post-preview').innerHTML = marked(this.value);
}, false);