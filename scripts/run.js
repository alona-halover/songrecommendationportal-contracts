const main = async () => {
    const recoContractFactory = await hre.ethers.getContractFactory('SongRecoPortal');
    const recoContract = await recoContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1')
    });
    await recoContract.deployed();
    console.log('Contract address: ', recoContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(recoContract.address);

    contractBalance = await hre.ethers.provider.getBalance(recoContract.address);
    console.log(
        'Contract balance: ',
        hre.ethers.utils.formatEther(contractBalance)
    );

    const recoTxn = await recoContract.recommend('test1');
    await recoTxn.wait();

    const recoTxn2 = await recoContract.recommend('test2');
    await recoTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(recoContract.address);
    console.log('Contract balance: ', hre.ethers.utils.formatEther(contractBalance));

    let allRecos = await recoContract.getAllRecos();
    console.log(allRecos);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runMain();