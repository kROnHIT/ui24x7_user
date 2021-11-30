import { Platform } from "react-native";
import RNFetchBlob from 'rn-fetch-blob';

const Parse = require('parse/react-native');

function getFileNameFromPath(filePath) {

    var fileName = ""
    try {
        fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    } catch (error) {
        console.error('Error parsing File Path for Name: ' + filePath, error);
    }
    return fileName;
}

uploadFile = async function (filePath) {

    var filePathToUse = filePath;
    var fileName;
    var fileContent;
    try {
        if (Platform.OS === 'ios') {
            filePathToUse = filePath.replace('file:', '')
        }
        const exists = await RNFetchBlob.fs.exists(filePathToUse);
        if (!exists) {

            console.warn('File Do not exists: ' + filePathToUse);
            return Promise.resolve();
        }
        fileName = getFileNameFromPath(filePathToUse);
        fileContent = await RNFetchBlob.fs.readFile(filePathToUse, 'base64');
    } catch (error) {

        console.error('Error reading file content: ' + filePathToUse, error);
        return Promise.reject();
    }
    try {

        var parseFile = new Parse.File(fileName, { base64: fileContent });
        await parseFile.save();
        return Promise.resolve(parseFile);
    } catch (error) {

        console.error('Error Uploading File to Parse: ' + fileName, error);
        return Promise.reject();
    }
}

const Utils = {
    uploadFiles: async function (filePaths) {
        return await Promise.all(filePaths.map((eachFilePath) => {
            return uploadFile(eachFilePath.source.uri);
        }));
    }
}

export default Utils;