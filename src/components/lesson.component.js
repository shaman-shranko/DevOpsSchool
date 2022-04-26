import VideoPlayer from 'react-native-video-player';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64';
import { useLink } from "../hooks/links.hook";
import { View } from 'react-native'

export default LessonComponent = (props) => {
    const [html, setHtml] = useState("")
    const [height, setHeight] = useState(50);
    const { data, type, url } = props;
    const { Links } = useLink()

    const onWebViewMessage = (event) => {
        setHeight(Number(event.nativeEvent.data) + 30)
    }

    useEffect(() => {
        let result = "";
        try {
            result = '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<meta name="viewport" content="width=device-width, initial-scale=1">' +
                styles +
                '</head>' +
                '<body>' +
                base64.decode(data) +
                '</body>' +
                '</html>';
        } catch (e) {
            result = data
        }
        setHtml(result)
    }, [data])

    useEffect(() => {
        setHeight(height)
    }, [height])

    if (type != 'video' && type != 'test') {
        return (
            <View style={{ height: height, width: "100%" }}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: html }}
                    onMessage={onWebViewMessage}
                    injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
                    javaScriptEnabled={true}
                />
            </View>
        )
    }

    if (type == "video") {
        return (
            <VideoPlayer
                video={{ uri: Links.Public + url }}
                style={{ borderWidth: 1, borderColor: "black" }}
                videoWidth={1600}
                videoHeight={900}
                pauseOnPress
            />
        )
    }
    if (type == "test") {
        return null
    }
    return null
}
const styles = `<style>/*GENERAL*/
body,html{
    overflow-x:hidden;
}
h4 {
    font-size: 14px;
}
ul{
    list-style-type: none;
}
/*navbar*/
.sidebar-nav .navbar-minimalize {
    position: absolute;
    right: -6px;
    top: -2px;
    z-index: 99999;
}

.sidebar-nav .metismenu {
    display: flex;
    flex-direction: column;
    color: rgba(255, 255, 255, .5);
    background-color: #3a4651;
}

.sidebar-nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.sidebar-nav .navbar-minimalize i {
    color: #85ce36;
    font-size: 24px;
}

.sidebar-nav .metismenu > li {
    position: relative;
    display: flex;
    flex-direction: column;
}

.sidebar-nav .metismenu a {
    position: relative;
    display: block;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, .5);
    padding: 13px 15px;
    letter-spacing: .1px;
    transition: all 0.3s ease-out;
    text-decoration: none;
    outline-width: 0;
}

.metismenu > li > a > i {
    font-size: 18px;
    width: 23px;
    text-align: center;
}

.pace-done .navbar-static-side, .pace-done .nav-header, .pace-done li.active, .pace-done #page-wrapper, .pace-done .footer {
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
}

.navbar-default {
    background-image: none;
    background-color: #3a4651;
    margin-bottom: 0;
}

.navbar-static-side {
    height: 100%;
}

.sidebar-nav {
    color: #748494;
}

body.mini-navbar .navbar-static-side {
    width: 70px;
}

.mini-navbar .sidebar-nav .metismenu {
    margin-top: 21px;
}

@media (min-width: 768px) {
    .navbar-static-side {
        z-index: 2001;
        position: absolute;
        width: 220px;
    }

    .navbar-default {
        border-color: #2f4050;
    }

}

.mini-navbar .sidebar-nav .navbar-minimalize i {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
}

@media (min-width: 480px) {
    .sidebar-nav.is-hoverable .metismenu li {
        position: relative;
    }
}

.mini-navbar .nav-header > .profile {
    margin: 10px auto 0;
}

.profile_pic {
    width: 30%;
}

.inline {
    display: inline-block !important;
}

.mini-navbar .profile_info {
    display: none !important;
}

.profile_info {
    padding: 0 0 0 10px !important;
    width: 70%;
    float: left;
}

.user_avatar_left_menu {
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 5px 3px;
    height: 45px;
    width: 45px;
    float: left;
    background-color: #85ce36;
    border-radius: 50%;
}

.user_avatar_left_menu_content {
    font-size: 20px;
    line-height: 45px;
    color: white !important;

}

.nav-header {
    padding: 15px 15px 0;
}

.profile_info span {
    font-size: 16px;
    line-height: 30px;
    color: #85ce36;
}

.profile_info h4 {
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    font-weight: 400;
}

.mini-navbar .nav-header > .profile {
    margin: 10px auto 0;
}

.mini-navbar li.nav-header {
    padding: 0;
}

.mini-navbar .nav-header {
    height: 61px;
}

body.mini-navbar .profile-element, body.mini-navbar .nav-label, body.mini-navbar .navbar-default .nav li a span {
    display: none;
}

.fas, .far, .fa {
    margin: 0px 5px;
}

.sidebar-nav .metismenu hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #323d46;
}

.sidebar-nav .metismenu > li > a:hover {
    color: #ffffff;
    background-color: #2d363f;
}

.sidebar-nav .metismenu > li.active > a, .sidebar-nav .metismenu > li.active > a:hover {
    color: #ffffff;
    background-color: #85ce36;
}

/*wrapper*/
#wrapper {
    width: 100%;
    /* overflow-x: hidden; */
    background-color: #3a4651;
}

body.mini-navbar #page-wrapper {
    margin: 0 0 0 70px;
}

#page-wrapper {
    background: #f6f9fc;
    padding-bottom: 50px;
}

#page-wrapper {
    position: inherit;
    margin: 0 0 0 220px;
    min-height: 100vh;
    padding: 0 25px;
}

/*footer*/
.pace-done .navbar-static-side, .pace-done .nav-header, .pace-done li.active, .pace-done #page-wrapper, .pace-done .footer {
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
}

.footer {
    display: flex;
    justify-content: space-between;
}

.footer {
    background: none repeat scroll 0 0 white;
    border-top: 1px solid #e7eaec;
    bottom: 0;
    left: 0;
    padding: 10px 20px;
    position: fixed;
    right: 0;
    z-index: 9999;
}

/*content*/
.block-content {
    background-color: #ffffff;
    padding: 10px;
    border-radius: 0;
    webkit-box-shadow: 1px 1px 5px rgba(126, 142, 159, 0.1);
    box-shadow: 1px 1px 5px rgb(126 142 159 / 10%);
}

/*table*/
.table-bordered {
    border: 0;
    margin-bottom: 0;
}

.table-bordered {
    border: 0;
    margin-bottom: 0;
}

.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
}

table {
    color: #748494 !important;
    background-color: #ffffff;
}

table {
    background-color: transparent;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
    border: 0;
    border-top: 1px solid #e7eaec;
    line-height: 1.42857;
    padding: 8px;
    vertical-align: top;
}

.table > thead > tr > th {
    /* color: #8bc24c; */
    color: #748494;
    font-weight: 500;
    font-size: 14px;
}

.table-bordered tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
}

/*PAGE-HEADER*/
.page-content h2 {
    font-size: 22px;
    font-weight: 500;
    color: #4f5f6f;
    line-height: 48px;
}

.dashboard-header h2 {
    margin-top: 10px;
    font-size: 26px;
}

/*BUTTONS*/
.btn-success {
    color: #fff;
    background-color: #f3b15a;
    border-color: #f3b15a;
}

.btn-success:hover, .btn-success:focus, .btn-success.focus {
    color: #fff;
    background-color: #e6a856;
    border-color: #e6a856;
}

.btn {
    border-radius: 3px;
}

.btn-secondary {
    color: #fff;
    background-color: #a9aeb3;
    border-color: #a9aeb3;
    float: left;
    padding: 6px 12px;
}
.btn-primary {
    color: #fff;
    background-color: #85ce36;
    border-color: #85ce36;
}

.btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/*MARGINS*/
.mt10 {
    margin-top: 10px;
}

.mt5 {
    margin-top: 5px;
}

.mt15 {
    margin-top: 15px;
}

.mt20 {
    margin-top: 20px;
}

.mt25 {
    margin-top: 25px;
}

.mb10 {
    margin-bottom: 10px;
}

.mb5 {
    margin-bottom: 5px;
}

.mb15 {
    margin-bottom: 15px;
}

.mb20 {
    margin-bottom: 20px;
}

.mb25 {
    margin-bottom: 25px;
}

.mt25 {
    margin-top: 25px;
}

.mr10 {
    margin-right: 10px;
}

.mr5 {
    margin-right: 5px;
}

.mr15 {
    margin-right: 15px;
}

.mr20 {
    margin-right: 20px;
}

.mr25 {
    margin-right: 25px;
}
.right{
    float:right;
}
.left{
    float:left
}

/*BLOCK-CONTENT*/
.block-form-setting {
    margin-top: 25px;
}

.projects-list.block-form-setting .block-content-form {
    margin-bottom: 0;
}

.block-form-setting .block-content-form {
    margin-bottom: 30px;
}

.block-content-form {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 0;
    box-shadow: inset 0px 0px 5px 5px rgb(126 142 159 / 10%);
}

.block-form-setting .block-content-form > h3 {
    margin-top: 0;
}

.block-content-form h3 {
    font-weight: 500;
}

.p0 {
    padding-left: 0 !important;
    padding-right: 0 !important;
}

/*FORM-GROUPS*/
form .form-group {
    min-height: 75px;
    margin-bottom: 0px;
}

label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    color: #748494;
    font-weight: 500;
}
.form-control, .single-line {
    background-image: none;
    border: 1px solid #d2dae6;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
}
.form-control {
    font-size: 14px;
}

.actions-wrapp {
    display: flex;
    justify-content: flex-end;
}
.table-bordered td a {
    color: #748494;
}
a {
    color: #337ab7;
    cursor: pointer;
}

/*ALIGMENT*/
.align-center{
    text-align: center;
}
.align-left{
    text-align: left;
}
.align-right{
    text-align: right;
}

.course-plans li{
    display: flex;
    align-items: center;

}
.course-plans li i{
    cursor: pointer;
    color:#f3b15a;
}
.course-plans li i:hover{
    opacity: 0.7;
}

.delete_file_btn{
    margin-top: -9px;
}

/*TABS*/
.tab #details:first-child, .tab .details:first-child {
    margin-left: 0;
}

.tab>div.active-tab {
    color: #3a4651;
    background-color: inherit;
    font-weight: 500;
    border-bottom: 2px solid #3a4651;
}
.tab>div {
    font-size: 14px;
    position: relative;
    text-transform: uppercase;
    margin-bottom: -2px;
    font-weight: 500;
}
#details, .details {
    float: left;
    margin-left: 10px;
    padding: 8px;
}
.active-tab {
    float: left;
    padding: 8px;
    border-bottom: none;
    background: #eeeeee;
}
.tab>div:hover {
    cursor: pointer;
}

#details:hover, .details:hover {
    color: #3a4651;
}
.details a {
    color:black;
}
.details a:hover{
    color:black;
    text-decoration: none;
    opacity: 0.7;
}
.details a:active{
    color:black;
    text-decoration: none;
    opacity: 0.7;
}

/*BLOCKS*/
.plan-wrapper {
    box-shadow: 4px 4px 8px 0px rgb(34 60 80 / 20%);
    border-radius: 5px;
    height: 250px;
}

.plan-wrapper .plan-image {
    height: 180px;
}

.ml10 {
    margin-left: 10px;
}

.plan-wrapper .plan-name, .plan-wrapper .plan-lessons {
    font-weight: 500;
    font-size: 20px;
    color: #798188;
}

.plan-wrapper hr {
    margin: 5px 0;
}

.plan-wrapper .plan-lessons {
    font-size: 15px !important;
}

.plan-wrapper .actions {
    display: flex;
    flex-direction: row;
    font-size: 19px;
    align-items: center;
    justify-content: flex-end;
    height: 59px;
}

.plan-wrapper .actions i:hover {
    opacity: 0.7;
    cursor: pointer;

}

/*EDITORJS*/
.ce-block .ce-block__content{
    padding-left: 50px;
    padding-right: 50px;
}

.ce-block__content{
    max-width: 100%;
}
#editorjs{
    padding:10px;
    display: flex;
    padding-bottom: 50px;
    flex-direction: column;
}

.ce-toolbar__content{
    max-width: 100%;
}

.ce-toolbar__actions{
    opacity: 1;
}
.ce-block .read-only{
    box-shadow: none;
    border:none;
}

/*TESTS*/
.question-wrapper{
    padding: 0 15px;
}
.answers-wrapper{
    margin-top: 50px;
}
.answer-item{
    display: grid;
    grid-template-columns: 90% 5% 5%;
    border-bottom: 1px solid #dad0d0;
}
.answer-item .answer{
    width:100%;
    border:none;
    height: 40px;
}
.answer-item .answer:focus{
    outline: none;
}
.answer-input-wrapper{
    text-align: center;
    border-right: 1px solid #dad0d0;
    padding-left: 5px;
}
.answer-input-wrapper input[type="radio"]{
    margin-top: 15px;

}
.add-answer{
    height: 35px;
    text-align: center;
    padding-top: 10px;
}
.add-answer:hover{
    background: #f6f6f6;
    cursor: pointer;
}
.delete-answer{
    font-size: 18px;
    margin-top: 10px;
    text-align: center;
    color: #ef7373;
    cursor: pointer;
}</style>`