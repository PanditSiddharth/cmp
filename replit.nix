{ pkgs }: {
    deps = [
        pkgs.killall
        pkgs.lsof
        pkgs.python39
        pkgs.gcc
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-16_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}