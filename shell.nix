{ pkgs ? (import <nixpkgs> { # optional config
}), ... }:
pkgs.mkShellNoCC {
  # ENV_VARS_GO_HERE=1
  packages = with pkgs;
    [ # packages go here
      google-cloud-sdk
    ];
  # shellHook = ''
  #   echo "Run this once shell has opened"
  #   # alias mypackage="mypackage --with-switches"
  # '';
}
