module.exports = {
    socialPostTemplate: `<html>
    <head>
        <style>
            .left {
                float: left;
                width: 50%;
            }
            .right {
                float: right;
                width: 50%;
            }
            .logo {
                width: 150px;
            }

            body {
                width: 800px;
            }

            .speaker-name {
                background-color: black;
                color: white;
                font-size: 30px;
                width: 80%;
            }

            .title {
                font-size: 30px;
                width: 80%;
            }
        </style>
    </head>
    <body>
        <div class="left"> 
            <img class="logo" src="https://pbs.twimg.com/profile_images/910524272900280320/05KyaP5j.jpg">
            <p class="speaker-name">Speaker Name</p>
            <p class="title">Title</p>
        </div>
        <div class="right"> 
            <img class="avatar" src="">
        </div>
    </body>
</html>`
};