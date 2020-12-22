{ mkYarnPackage }:

mkYarnPackage {
  src       = ./.;

  WEB3_PROVIDER = "/rpc/node";
  BABEL_ENV = "development";
  NODE_ENV = "development";
  MANTIS_VM = "VM_Name";

  doCheck    = true;
  checkPhase = "yarn test --coverage --ci";
  distPhase  = "true";

  patchPhase = ''
    substituteInPlace public/index.html --replace "{process.env.MANTIS_VM}" "$MANTIS_VM"
    substituteInPlace src/components/layout/Header.js --replace "{process.env.MANTIS_VM}" "$MANTIS_VM"
  '';

  buildPhase = ''
    export HOME="$NIX_BUILD_TOP"
    yarn run build
  '';

  installPhase = ''
    mv deps/$pname/build $out
  '';
}
