// BONUS POINT KALO UDAH DAPET TERUS TURUN LEVEL, GAK DAPET BONUS POINT LAGI
let arr = []
let percentageLoss = [
    {
        medal: -1,
        consecutivePercentage: [100, 300],
        monthlyPercentage: [100, 175]
    },
    {
        medal: -2,
        consecutivePercentage: [300, 500],
        monthlyPercentage: [175, 250]
    },
    {
        medal: -3,
        consecutivePercentage: [500, 600],
        monthlyPercentage: [250, 300]
    },
    {
        medal: -4,
        consecutivePercentage: [600, 650],
        monthlyPercentage: [300, 350]
    },
    {
        medal: -5,
        consecutivePercentage: [650, 675],
        monthlyPercentage: [350, 375]
    },
    {
        medal: -6,
        consecutivePercentage: [675, 700],
        monthlyPercentage: [375, 400]
    },
    {
        medal: -7,
        consecutivePercentage: [700],
        monthlyPercentage: [400]
    },
]
let arrLevel = [
    {
        levelName: "Newbie",
        medal: [0],
        perkalian: 0.3,
        perkalianLoss: 0.15,
        bonusPoint: 0
    },
    {
        levelName: "Rookie",
        medal: [1,2],
        perkalian: 0.3,
        perkalianLoss: 0.15,
        bonusPoint: 0
    },
    {
        levelName: "Pro",
        medal: [3,4],
        perkalian: 0.4,
        perkalianLoss: 0.2,
        bonusPoint: 50
    },
    {
        levelName: "Elite",
        medal: [5,6,7],
        perkalian: 0.5,
        perkalianLoss: 0.25,
        bonusPoint: 100
    },
    {
        levelName: "Master 1",
        medal: [8,9,10],
        perkalian: 0.7,
        perkalianLoss: 0.35,
        bonusPoint: 300
    },
    {
        levelName: "Master 2",
        medal: [11,12],
        perkalian: 1,
        perkalianLoss: 0.5,
        bonusPoint: 0
    },
    {
        levelName: "Legend",
        medal: [13,14],
        perkalian: 1.5,
        perkalianLoss: 0.75,
        bonusPoint: 500
    },
]

$('#calculate').click(function(){
    let pips = parseInt($('#pips').val())
    let signal = parseInt($('#signal').val())
    if(pips >= 200){
        if(signal >= 5){
            let point
            let medal
            let totalPoint = 0
            let totalMedal = 1
            let bonus = 0

            if(arr.length == 0){
                medal = 1
                point = 100 + ((pips - 200) * 0.3)
                totalPoint = point
            }else{
                if(pips >= arr[arr.length-1].target){
                    medal = 1
                    totalMedal = arr[arr.length-1].totalMedal + medal

                    for(let i=0; i<arrLevel.length; i++){
                        // Perhitungan Sisa Point
                        for(let j=0; j<arrLevel[i].medal.length; j++){
                            if(arr[arr.length-1].totalMedal == arrLevel[i].medal[j]){
                                point = 100 + ((pips - 200) * arrLevel[i].perkalian)
                            }
                        }

                        // Perhitungan Bonus Point
                        if(totalMedal == arrLevel[i].medal[0]){
                            bonus = arrLevel[i].bonusPoint
                        }
                    }
                }else{
                    medal = 0
                    totalMedal = arr[arr.length-1].totalMedal + medal
                    for(let i=0; i<arrLevel.length; i++){
                        // Perhitungan Sisa Point
                        for(let j=0; j<arrLevel[i].medal.length; j++){
                            if(arr[arr.length-1].totalMedal == arrLevel[i].medal[j]){
                                point = 100 + ((pips - 200) * arrLevel[i].perkalian)
                            }
                        }
                    }
                }

                // PENGECEKAN UDAH PERNAH BONUS
                if(bonus>0){
                    for(let i=0; i<arr.length; i++){
                        if(bonus == arr[i].bonus){
                            bonus = 0
                        }
                    }
                }
                totalPoint = arr[arr.length-1].totalPoint + point + bonus
            }

            totalMedal = totalMedal > 14 ? 14 : totalMedal

            let data = {pips, signal, point, medal, target: pips * 0.7, totalPoint, totalMedal, bonus, consecutiveLoss: 0}
            arr.push(data)
            $('#tableCalculate').append("<tr><td>"+ (arr.length) +"</td><td>"+arr[arr.length-1].pips+"</td><td>"+arr[arr.length-1].signal+"</td><td>"+(arr[arr.length-1].point)+"</td><td>"+(arr[arr.length-1].totalPoint).toFixed(2)+"</td><td>"+arr[arr.length-1].medal+"</td><td>"+arr[arr.length-1].totalMedal+"</td><td>"+arr[arr.length-1].target+"</td><td>"+arr[arr.length-1].bonus+"</td></tr>")
        }else{
            if(arr.length == 0){
                let data = {
                    pips: pips,
                    signal: signal,
                    point: 0,
                    medal: 0,
                    target: 200,
                    totalPoint: 0,
                    totalMedal: 0,
                    bonus: 0,
                    consecutiveLoss: 0
                }
                arr.push(data)
                $('#tableCalculate').append("<tr><td>"+ (arr.length) +"</td><td>"+arr[arr.length-1].pips+"</td><td>"+arr[arr.length-1].signal+"</td><td>"+arr[arr.length-1].point+"</td><td>"+arr[arr.length-1].totalPoint+"</td><td>"+arr[arr.length-1].medal+"</td><td>"+arr[arr.length-1].totalMedal+"</td><td>"+arr[arr.length-1].target+"</td><td>"+arr[arr.length-1].bonus+"</td></tr>")
            }else{
                let data = {
                    pips: pips,
                    signal: signal,
                    point: 0,
                    medal: 0,
                    target: arr[arr.length-1].target,
                    totalPoint: arr[arr.length-1].totalPoint,
                    totalMedal: arr[arr.length-1].totalMedal,
                    bonus: 0,
                    consecutiveLoss: arr[arr.length-1].consecutiveLoss
                }
                arr.push(data)
                $('#tableCalculate').append("<tr><td>"+ (arr.length) +"</td><td>"+arr[arr.length-1].pips+"</td><td>"+arr[arr.length-1].signal+"</td><td>"+arr[arr.length-1].point+"</td><td>"+arr[arr.length-1].totalPoint+"</td><td>"+arr[arr.length-1].medal+"</td><td>"+arr[arr.length-1].totalMedal+"</td><td>"+arr[arr.length-1].target+"</td><td>"+arr[arr.length-1].bonus+"</td></tr>")
            }
        }
    }else if(pips <= -200){
        if(arr.length == 0){
            let data = {
                pips: pips,
                signal: signal,
                point: 0,
                medal: 0,
                target: 200,
                totalPoint: 0,
                totalMedal: 0,
                bonus: 0,
                consecutiveLoss: parseInt(pips)
            }
            arr.push(data)
            $('#tableCalculate').append("<tr><td>"+ (arr.length) +"</td><td>"+arr[arr.length-1].pips+"</td><td>"+arr[arr.length-1].signal+"</td><td>"+arr[arr.length-1].point+"</td><td>"+arr[arr.length-1].totalPoint+"</td><td>"+arr[arr.length-1].medal+"</td><td>"+arr[arr.length-1].totalMedal+"</td><td>"+arr[arr.length-1].target+"</td><td>"+arr[arr.length-1].bonus+"</td></tr>")
        }else{
            let medal = 0
            let consecutiveMedal = 0
            let monthlyLossMedal = 0
            let bonus = 0
            let target = arr[arr.length-1].target 
            
            // PERHITUNGAN PENGURANGAN POINT
            let point
            for(let i=0; i<arrLevel.length; i++){
                for(let j=0; j<arrLevel[i].medal.length; j++){
                    if(arr[arr.length-1].totalMedal == arrLevel[i].medal[j]){
                        point = -50 + ((parseInt(pips) + 200) * arrLevel[i].perkalianLoss)
                    }
                }
            }

            let totalPoint = arr[arr.length-1].totalPoint + point 
            let totalMedal = arr[arr.length-1].totalMedal
            let consecutiveLoss = arr[arr.length-1].consecutiveLoss + parseInt(pips)
            let profitMonth = 0
            let avgMonth
            let sumMonth = 0

            for(let i=arr.length-1; i>=0; i--){
                if(profitMonth<6){
                    if(arr[i].pips > 0){
                        sumMonth = parseInt(sumMonth + arr[i].pips)
                        profitMonth++
                    }
                }
            }

            avgMonth = sumMonth/profitMonth

            let loss = ((parseInt(pips) * -1)/avgMonth) * 100

            if(arr[arr.length-1].consecutiveLoss < 0){
                // Consecutive Loss Percentage
                let avgConsecutive = (((consecutiveLoss * -1)/avgMonth) * 100)

                for(let i=0; i<percentageLoss.length; i++){
                    if(percentageLoss[i].medal != -7){
                        if(avgConsecutive>percentageLoss[i].consecutivePercentage[0] && avgConsecutive <=percentageLoss[i].consecutivePercentage[1]){
                            consecutiveMedal = percentageLoss[i].medal
                        }
                    }else{
                        if(avgConsecutive>percentageLoss[i].consecutivePercentage[0]){
                            consecutiveMedal = percentageLoss[i].medal
                        }
                    }
                }

                for(let i=0; i<percentageLoss.length; i++){
                    if(percentageLoss[i].medal != -7){
                        if(loss>percentageLoss[i].monthlyPercentage[0] && loss <=percentageLoss[i].monthlyPercentage[1]){
                            monthlyLossMedal = percentageLoss[i].medal
                        }
                    }else{
                        if(loss>percentageLoss[i].monthlyPercentage[0]){
                            monthlyLossMedal = percentageLoss[i].medal
                        }
                    }
                }

                medal = monthlyLossMedal + consecutiveMedal
                totalMedal = arr[arr.length-1].totalMedal + medal
            }else{
                // Monthly Loss
                for(let i=0; i<percentageLoss.length; i++){
                    if(percentageLoss[i].medal != -7){
                        if(loss>percentageLoss[i].monthlyPercentage[0] && loss <=percentageLoss[i].monthlyPercentage[1]){
                            monthlyLossMedal = percentageLoss[i].medal
                        }
                    }else{
                        if(loss>percentageLoss[i].monthlyPercentage[0]){
                            monthlyLossMedal = percentageLoss[i].medal
                        }
                    }
                }

                medal = monthlyLossMedal
                totalMedal = arr[arr.length-1].totalMedal + medal
            }
            
            totalMedal = totalMedal < 0 ? 0 : totalMedal
            totalPoint = totalPoint < 0 ? 0 : totalPoint

            let data = {pips, signal, point, medal, target, totalPoint, totalMedal, consecutiveLoss, bonus}
            arr.push(data)
            $('#tableCalculate').append("<tr><td>"+ (arr.length) +"</td><td>"+arr[arr.length-1].pips+"</td><td>"+arr[arr.length-1].signal+"</td><td>"+(arr[arr.length-1].point).toFixed(2)+"</td><td>"+(arr[arr.length-1].totalPoint).toFixed(2)+"</td><td>"+arr[arr.length-1].medal+"</td><td>"+arr[arr.length-1].totalMedal+"</td><td>"+arr[arr.length-1].target+"</td><td>"+arr[arr.length-1].bonus+"</td></tr>")
        }
    }else{
        if(arr.length == 0){
            let data = {
                pips: pips,
                signal: signal,
                point: 0,
                medal: 0,
                target: 200,
                totalPoint: 0,
                totalMedal: 0,
                bonus: 0,
                consecutiveLoss: pips
            }
            arr.push(data)
            $('#tableCalculate').append("<tr><td>"+ (arr.length) +"</td><td>"+arr[arr.length-1].pips+"</td><td>"+arr[arr.length-1].signal+"</td><td>"+arr[arr.length-1].point+"</td><td>"+arr[arr.length-1].totalPoint+"</td><td>"+arr[arr.length-1].medal+"</td><td>"+arr[arr.length-1].totalMedal+"</td><td>"+arr[arr.length-1].target+"</td><td>"+arr[arr.length-1].bonus+"</td></tr>")
        }else{
            let data = {
                pips: pips,
                signal: signal,
                point: 0,
                medal: 0,
                target: arr[arr.length-1].target,
                totalPoint: arr[arr.length-1].totalPoint,
                totalMedal: arr[arr.length-1].totalMedal,
                bonus: 0,
                consecutiveLoss: arr[arr.length-1].consecutiveLoss
            }
            arr.push(data)
            $('#tableCalculate').append("<tr><td>"+ (arr.length) +"</td><td>"+arr[arr.length-1].pips+"</td><td>"+arr[arr.length-1].signal+"</td><td>"+arr[arr.length-1].point+"</td><td>"+arr[arr.length-1].totalPoint+"</td><td>"+arr[arr.length-1].medal+"</td><td>"+arr[arr.length-1].totalMedal+"</td><td>"+arr[arr.length-1].target+"</td><td>"+arr[arr.length-1].bonus+"</td></tr>")
        }
    }
})  