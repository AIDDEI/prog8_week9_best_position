// Globals
const nn = ml5.neuralNetwork({ task: 'regression', debug: true });
let trainData;
let testData;

let correct = 0;
let incorrect = 0;
let testAmount = 2000;
let totalAmount = 0;

let saveButton = document.getElementById("saveButton");

// Data
const csvFile = "data/fifa23.csv";

// Load the CSV file
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => sortData(results.data),
    });
}

// Sort the data and create the train data and test data
function sortData(data) {
    // Shuffle
    data.sort(() => (Math.random() - 0.5));

    // Create the trainData and testData
    trainData = data.slice(0, Math.floor(data.length * 0.8));
    testData = data.slice(Math.floor(data.length * 0.8) + 1);

    // Add all players of the trainData to the neural network
    for (let player of trainData) {
        nn.addData({
            overall: player.overall,
            crossing: player.crossing,
            finishing: player.finishing,
            headingAccuracy: player.headingAccuracy,
            shortPassing: player.shortPassing,
            volleys: player.volleys,
            dribbling: player.dribbling,
            curve: player.curve,
            freekickAccuracy: player.freekickAccuracy,
            longPassing: player.longPassing,
            ballControl: player.ballControl,
            acceleration: player.acceleration,
            sprintSpeed: player.sprintSpeed,
            agility: player.agility,
            reactions: player.reactions,
            balance: player.balance,
            shotPower: player.shotPower,
            jumping: player.jumping,
            stamina: player.stamina,
            strength: player.strength,
            longShots: player.longShots,
            aggression: player.aggression,
            interceptions: player.interceptions,
            positioning: player.positioning,
            vision: player.vision,
            penalties: player.penalties,
            composure: player.composure,
            marking: player.marking,
            standingTackle: player.standingTackle,
            slidingTackle: player.slidingTackle,
            goalkeeperDiving: player.goalkeeperDiving,
            goalkeeperHandling: player.goalkeeperHandling,
            goalkeeperKicking: player.goalkeeperKicking,
            goalkeeperPositioning: player.goalkeeperPositioning,
            goalkeeperReflexes: player.goalkeeperReflexes,
        },
        {
            stRating: player.stRating,
            lwRating: player.lwRating,
            lfRating: player.lfRating,
            cfRating: player.cfRating,
            rfRating: player.rfRating,
            rwRating: player.rwRating,
            camRating: player.camRating,
            lmRating: player.lmRating,
            cmRating: player.cmRating,
            rmRating: player.rmRating,
            lwbRating: player.lwbRating,
            cdmRating: player.cdmRating,
            rwbRating: player.rwbRating,
            lbRating: player.lbRating,
            cbRating: player.cbRating,
            rbRating: player.rbRating,
            gkRating: player.gkRating,
        });
    }

    // Normalize the data
    nn.normalizeData();

    // Start training
    startTraining();
}

// Start the training
function startTraining() {
    nn.train({ epochs: 20 }, () => finishedTraining());
}

// Training is finished
function finishedTraining() {
    console.log("Finished Training");
    makePrediction();
}

// Test the model
async function makePrediction() {
    for (let i = 0; i < testAmount; i++) {
        const testPlayer = { 
            overall: testData[i].overall,
            crossing: testData[i].crossing,
            finishing: testData[i].finishing,
            headingAccuracy: testData[i].headingAccuracy,
            shortPassing: testData[i].shortPassing,
            volleys: testData[i].volleys,
            dribbling: testData[i].dribbling,
            curve: testData[i].curve,
            freekickAccuracy: testData[i].freekickAccuracy,
            longPassing: testData[i].longPassing,
            ballControl: testData[i].ballControl,
            acceleration: testData[i].acceleration,
            sprintSpeed: testData[i].sprintSpeed,
            agility: testData[i].agility,
            reactions: testData[i].reactions,
            balance: testData[i].balance,
            shotPower: testData[i].shotPower,
            jumping: testData[i].jumping,
            stamina: testData[i].stamina,
            strength: testData[i].strength,
            longShots: testData[i].longShots,
            aggression: testData[i].aggression,
            interceptions: testData[i].interceptions,
            positioning: testData[i].positioning,
            vision: testData[i].vision,
            penalties: testData[i].penalties,
            composure: testData[i].composure,
            marking: testData[i].marking,
            standingTackle: testData[i].standingTackle,
            slidingTackle: testData[i].slidingTackle,
            goalkeeperDiving: testData[i].goalkeeperDiving,
            goalkeeperHandling: testData[i].goalkeeperHandling,
            goalkeeperKicking: testData[i].goalkeeperKicking,
            goalkeeperPositioning: testData[i].goalkeeperPositioning,
            goalkeeperReflexes: testData[i].goalkeeperReflexes,
        };

        const prediction = await nn.predict(testPlayer);

        // Predictions
        let predictedSTRating = Math.round(prediction[0].stRating);
        let predictedLWRating = Math.round(prediction[1].lwRating);
        let predictedLFRating = Math.round(prediction[2].lfRating);
        let predictedCFRating = Math.round(prediction[3].cfRating);
        let predictedRWRating = Math.round(prediction[4].rwRating);
        let predictedRFRating = Math.round(prediction[5].rfRating);
        let predictedCAMRating = Math.round(prediction[6].camRating);
        let predictedLMRating = Math.round(prediction[7].lmRating);
        let predictedCMRating = Math.round(prediction[8].cmRating);
        let predictedRMRating = Math.round(prediction[9].rmRating);
        let predictedLWBRating = Math.round(prediction[10].lwbRating);
        let predictedCDMRating = Math.round(prediction[11].cdmRating);
        let predictedRWBRating = Math.round(prediction[12].rwbRating);
        let predictedLBRating = Math.round(prediction[13].lbRating);
        let predictedCBRating = Math.round(prediction[14].cbRating);
        let predictedRBRating = Math.round(prediction[15].rbRating);
        let predictedGKRating = Math.round(prediction[16].gkRating);

        testData[i].stRating

        // Validate every rating
        predictionValidate(predictedSTRating, testData[i].stRating);
        predictionValidate(predictedLWRating,  testData[i].lwRating);
        predictionValidate(predictedLFRating,  testData[i].lfRating);
        predictionValidate(predictedCFRating,  testData[i].cfRating);
        predictionValidate(predictedRWRating,  testData[i].rwRating);
        predictionValidate(predictedRFRating,  testData[i].rfRating);
        predictionValidate(predictedCAMRating,  testData[i].camRating);
        predictionValidate(predictedLMRating,  testData[i].lmRating);
        predictionValidate(predictedCMRating,  testData[i].cmRating);
        predictionValidate(predictedRMRating,  testData[i].rmRating);
        predictionValidate(predictedLWBRating,  testData[i].lwbRating);
        predictionValidate(predictedCDMRating,  testData[i].cdmRating);
        predictionValidate(predictedRWBRating,  testData[i].rwbRating);
        predictionValidate(predictedLBRating,  testData[i].lbRating);
        predictionValidate(predictedCBRating,  testData[i].cbRating);
        predictionValidate(predictedRBRating,  testData[i].rbRating);
        predictionValidate(predictedGKRating,  testData[i].gkRating);
    }

    await calculateAccuracy();
}

// Validate the prediction
async function predictionValidate(predictedRating, testDataRating) {
    if (predictedRating === undefined || testDataRating === undefined){
        console.log(`Waarde is undefined, dus wordt overgelagen`);
    } else {
        if (predictedRating === testDataRating || predictedRating == testDataRating + 1 || predictedRating == testDataRating + 2 || predictedRating == testDataRating - 1 || predictedRating == testDataRating - 2) {
            console.log(`De voorspelling is juist, want de voorspelde rating is ${predictedRating} en dus gelijk aan ${testDataRating}!`);
            totalAmount++;
            correct++;
        } else {
            console.log(`De voorspelling is onjuis, want de voorspelde rating is ${predictedRating}, terwijl de echte rating ${testDataRating} is...`);
            totalAmount++;
            incorrect++;
        }
    }
}

// Calculate the accuracy
async function calculateAccuracy() {
    let accuracy = (correct / totalAmount) * 100;
    console.log(`De nauwkeurigheid is ${accuracy}%: er zijn in het totaal ${totalAmount} values, waarvan er ${correct} correct zijn en ${incorrect} incorrect.`);
    saveButton.addEventListener("click", saveModel);
}

// Save the model
function saveModel() {
    nn.save();
}

// Execute
loadData();