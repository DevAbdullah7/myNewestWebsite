// Caching Daynamic
const cacheItems = document.querySelectorAll('.cacheItem')
cacheItems.forEach(item => {
    if (item.src !== undefined) {
        item.src = item.src + cacheVersion
    } else if (item.href !== undefined) {
        item.href = item.href + cacheVersion
    } else if (item.content !== undefined) {
        item.content = item.content + cacheVersion
    } else {
        console.log(item)
    }
})

// Popular Variabls
let html = document.querySelector('.html')
let body = document.querySelector('.body')
let nav = document.querySelector('.nav')
let mainContent = document.querySelector('.mainContent')
let footer = document.querySelector('.footer');
let topArrowBtn = document.querySelector('.topArrow');

// Website Sittings Showen ( Language - Mood )
const settingsBtn = document.querySelector('.nav #settingsBtn')
const moodBtn = document.querySelector('.nav #moodBtn')
const languageBtn = document.querySelector('.nav #languageBtn')
settingsBtn.addEventListener('click', () => {
    settingsBtn.classList.toggle('active')
    languageBtn.classList.toggle('active')
    moodBtn.classList.toggle('active')

    // Closing settings aftter 2.5s 
    // if (settingsBtn.classList.contains('active')) {
    //     let test = setTimeout(() => {
    //         closeSettings()
    //     }, 2500);
    // }
})
function closeSettings() {
    settingsBtn.classList.remove('active')
    languageBtn.classList.remove('active')
    moodBtn.classList.remove('active')
}

// Website Mood ( Light Mood - Dark Mood )
function lightMood() {
    window.localStorage.setItem('mood', 'light');
    moodBtn.classList.remove('dark');
    html.classList.remove('dark');
    moodBtn.classList.add('light');
    html.classList.add('light');
}
function darkMood() {
    window.localStorage.setItem('mood', 'dark');
    moodBtn.classList.remove('light');
    html.classList.remove('light');
    moodBtn.classList.add('dark');
    html.classList.add('dark');
}

moodBtn.addEventListener('click', () => {
    if (moodBtn.classList.contains('light')) {
        darkMood()
    } else if (moodBtn.classList.contains('dark')) {
        lightMood()
    }
    closeSettings()
})
if (window.localStorage.hasOwnProperty('mood')) {
    if (localStorage.valueOf('mood').mood !== 'dark') {
        lightMood();
    } else {
        darkMood();
    }
} else {
    lightMood();
}

// Language Changeing
function english() {
    window.localStorage.setItem('language', 'english');
    languageBtn.classList.remove('arabic');
    html.classList.remove('arabic');
    languageBtn.classList.add('english');
    html.classList.add('english');
}
function arabic() {
    window.localStorage.setItem('language', 'arabic');
    languageBtn.classList.remove('english');
    html.classList.remove('english');
    languageBtn.classList.add('arabic');
    html.classList.add('arabic');
}

languageBtn.addEventListener('click', () => {
    if (languageBtn.classList.contains('english')) {
        arabic()
    } else if (languageBtn.classList.contains('arabic')) {
        english()
    }
    closeSettings()
})
if (window.localStorage.hasOwnProperty('language')) {
    if (localStorage.valueOf('language').language !== 'english') {
        arabic();
    } else {
        english();
    }
} else {
    arabic();
}

// Scralling Transition 
function homeTransition() {
    let shape1 = document.querySelector('.homeSectionContent .shape1')
    let shape2 = document.querySelector('.homeSectionContent .shape2')
    let shape3 = document.querySelector('.homeSectionContent .shape3')
    shape1.style['top'] = `-${window.pageYOffset}px`
    shape2.style['left'] = `-${window.pageYOffset}px`
    shape2.style['bottom'] = `-${window.pageYOffset}px`
    shape3.style['right'] = `-${window.pageYOffset}px`
    shape3.style['bottom'] = `-${window.pageYOffset}px`

    let temp = document.querySelector('#about')
    if (temp.getBoundingClientRect().top < window.innerHeight - 150) {
        document.querySelector('.mainShape').style['opacity'] = 0
    } else {
        document.querySelector('.mainShape').style['opacity'] = 1
    }
}
function topArrow() {
    if (window.innerWidth < 450) {
        // console.log('phone')
        if (window.scrollY > 2750) {
            if (document.querySelector('#footer').getBoundingClientRect().top < window.innerHeight) {
                topArrowBtn.classList.remove('show')
            } else {
                topArrowBtn.classList.add('show')
            }
        } else {
            topArrowBtn.classList.remove('show')
        }
    } else {
        // document.querySelector('.portfolio').clientHeight
        if (1750 < window.scrollY) {
            if (document.querySelector('#footer').getBoundingClientRect().top < window.innerHeight) {
                topArrowBtn.classList.remove('show')
            } else {
                topArrowBtn.classList.add('show')
            }
        } else {
            topArrowBtn.classList.remove('show')
        }
    }
}
function reveal() {
    let sections = document.querySelectorAll('.reveal')
    for (let i = 0; i < sections.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = sections[i].getBoundingClientRect().top;
        let revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            sections[i].classList.add('active');
            if (sections[i].classList.contains('skills')) {
                if (!skillsNumsAnimation) {
                    let nums = document.querySelectorAll('.skills .numsAnimation')
                    nums.forEach((num) => startCount(num))
                }
                skillsNumsAnimation = true;
                let skillsBars = document.querySelectorAll('.skills .skillBar');
                skillsBars.forEach((bar) => {
                    bar.classList.add('active')
                })
            } else if (sections[i].classList.contains('facts')) {
                if (!factsNumsAnimation) {
                    let nums = document.querySelectorAll('.facts .numsAnimation')
                    nums.forEach((num) => startCount(num))
                }
                factsNumsAnimation = true;
            }
        } else {
            sections[i].classList.remove('active');
            if (sections[i].classList.contains('skills')) {
                skillsNumsAnimation = false;
                let nums = document.querySelectorAll('.skills .numsAnimation')
                nums.forEach((num) => {
                    num.textContent = 0
                })
                let skillsBars = document.querySelectorAll('.skills .skillBar');
                skillsBars.forEach((bar) => {
                    bar.classList.remove('active')
                })
            } else if (sections[i].classList.contains('facts')) {
                factsNumsAnimation = false;
                let nums = document.querySelectorAll('.facts .numsAnimation')
                nums.forEach((num) => {
                    num.textContent = 0
                })
            }
        }
    }
}
function startCount(el) {
    let goal = Number(el.getAttribute('goal'));
    let counter = setInterval(() => {
        el.textContent++;
        if (Number(el.textContent) === goal) {
            clearInterval(counter);
        }
    }, 1250 / goal)
}

let skillsNumsAnimation = false;
let factsNumsAnimation = false;
window.addEventListener('scroll', () => {
    if (document.querySelector('.mainShape') !== null) {
        homeTransition();
    } else {
        
    }
    topArrow();
    reveal();
});

let navMobileBtn = document.getElementById('navMobileBtn')
function navMobileShow(BTN) {
    if (BTN.classList.contains('open')) {
        BTN.classList.remove('open')
        BTN.classList.add('close')
        nav.setAttribute('mobile', 'open')
    } else if (BTN.classList.contains('close')) {
        BTN.classList.remove('close')
        BTN.classList.add('open')
        nav.setAttribute('mobile', 'close')
    }
}
navMobileBtn.addEventListener('click', () => {
    navMobileShow(navMobileBtn)
})
document.querySelectorAll('.nav li').forEach((el) => {
    el.addEventListener('click', () => {
        if (el.id !== 'settingsBtn') {
            navMobileShow(navMobileBtn)
        }
    })
})

// Projects type showen 
function showProjects() {
    let projectsChoices = document.querySelectorAll('.portfolio .controls span')
    projectsChoices.forEach((choice) => {
        choice.addEventListener('click', () => {
            projectsChoices.forEach((choice) => {
                choice.classList.remove('clicked')
            })
            choice.classList.add('clicked')
            let cards = document.querySelectorAll('.portfolio .card')
            cards.forEach((card) => {
                let choiceType = choice.getAttribute('proType')
                if (card.getAttribute('proType').match(choiceType)) {
                    card.classList.add('show')
                    let tags = document.querySelectorAll('.portfolio .card .details .tags span')
                    tags.forEach((tag) => {
                        if (tag.getAttribute('proType').match(choiceType)) {
                            tag.classList.add('active')
                        } else {
                            tag.classList.remove('active')
                        }
                    })
                } else {
                    card.classList.remove('show')
                }
            })
        })
    })
}
showProjects()

function projectsColumns(column1, column2) {
    let parent = document.getElementById('Content')
    if (window.innerWidth < 1024) {
        document.getElementById('Content').innerHTML = column2 + column1
    } else {
        document.getElementById('Content').innerHTML = column1 + column2
    }
}

function savePDF() {
    window.print()
    // setTimeout(() => { history.back() }, 2000);
}