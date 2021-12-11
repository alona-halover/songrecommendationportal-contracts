const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());

    const recoContractFactory = await hre.ethers.getContractFactory('SongRecoPortal');
    const recoContract = await recoContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.001')
    });
    await recoContract.deployed();

    console.log('SongRecoPortal address: ', recoContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

runMain();