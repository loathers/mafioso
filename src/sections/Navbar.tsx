import React from "react";
import { observer } from "mobx-react";
import { Link, LinkProps } from "react-router-dom";
import { useLocation } from "react-router";

import { CHARTS_URL, DATABASE_URL, STATS_URL } from "../constants/PAGE_URLS";

import appStore from "../store/appStore";
import logStore from "../store/logStore";

import LogoComponent from "../components/LogoComponent";

import LogUploader from "./LogUploader";
import PopupController from "./PopupController";
import ShareConfirmationPopup from "./ShareConfirmationPopup";

import combineClassnames from "../utilities/combineClassnames";

const enableCharts = import.meta.env.MAFIOSO_ENABLE_CHARTS === "true";
const enableDatabase = import.meta.env.MAFIOSO_ENABLE_SHARE === "true";
const enableStats = import.meta.env.MAFIOSO_ENABLE_STATS === "true";

type Props = { className?: string };

export default function Navbar({ className }: Props) {
  const location = useLocation();

  const pageName = location.pathname.split("/")[1];

  return (
    <div
      id="app-navbar"
      className={combineClassnames(
        "zindex-7 pad-v-3 flex-col jcontent-center",
        className,
      )}
    >
      <UpperNavbar pageName={pageName} className="flex-none adjacent-mar-t-1" />
    </div>
  );
}

type UpperNavbarProps = { className?: string; pageName: string };

const UpperNavbar = observer(function _UpperNavbar({
  className,
  pageName,
}: UpperNavbarProps) {
  const showDescription = logStore.hasParsedEntries && logStore.isAscensionLog;

  function onClickShare() {
    if (appStore.isShareDisabled) {
      appStore.showShareFailReason();
      return;
    }

    PopupController.show({
      title: "Log Sharing",
      children: (
        <ShareConfirmationPopup onClickDone={() => PopupController.hide()} />
      ),
    });
  }

  return (
    <div className={combineClassnames("flex-row aitems-center", className)}>
      <LogoComponent className="flex-none adjacent-mar-l-6" />

      {showDescription && (
        <LogOwnerDescription className="overflow-hidden whitespace-nowrap flex-auto adjacent-mar-l-6" />
      )}

      {!showDescription && <div className="flex-auto adjacent-mar-l-6" />}

      <div className="jcontent-end aself-end flex-none flex-row adjacent-mar-l-6">
        <LogUploader className="fontsize-4 adjacent-mar-l-3">
          Upload Log
        </LogUploader>

        <NavbarDivider className="pad-l-4" />

        <NavbarButton
          to={appStore.visualizerUrl}
          isActive={pageName === "view"}
          disabled={!appStore.isReady}
          children="Visualizer"
          className="adjacent-mar-l-3"
        />

        {(appStore.isDevEnv || enableStats) && (
          <NavbarButton
            to={STATS_URL}
            isActive={pageName === "stats"}
            disabled={!appStore.isReady}
            children="Stats"
            className="adjacent-mar-l-3"
          />
        )}

        {(appStore.isDevEnv || enableCharts) && (
          <NavbarButton
            to={CHARTS_URL}
            isActive={pageName === "charts"}
            disabled={!appStore.isReady}
            children="Charts"
            className="adjacent-mar-l-3"
          />
        )}

        {(appStore.isDevEnv || enableDatabase) && (
          <NavbarButton
            to={DATABASE_URL}
            isActive={pageName === "database"}
            children="Database"
            className="adjacent-mar-l-3"
          />
        )}

        <NavbarDivider />

        <NavbarButton
          onClick={() => appStore.downloadFullLog()}
          disabled={!appStore.isReady}
          children="Download"
          className="adjacent-mar-l-3"
        />

        {(appStore.isDevEnv || enableDatabase) && (
          <NavbarButton
            onClick={onClickShare}
            disabled={!appStore.isReady}
            children="Share"
            className="adjacent-mar-l-3"
          />
        )}
      </div>
    </div>
  );
});

type LogOwnerDescriptionProps = {
  className?: string;
};

const LogOwnerDescription = observer(function _LogOwnerDescription({
  className,
}: LogOwnerDescriptionProps) {
  return (
    <div
      className={combineClassnames(
        "fontsize-3 flexwrap-yes overflow-hidden flex-col",
        className,
      )}
    >
      <div className="flex-row">
        <span className="adjacent-mar-l-2">starring</span>
        <span className="f-bold adjacent-mar-l-2">
          {logStore.characterName}
        </span>
        <span className="adjacent-mar-l-2">{`the ${logStore.className}`}</span>
      </div>
      <div className="flex-row">
        <span className="adjacent-mar-l-2">in</span>
        <span className="f-bold adjacent-mar-l-2">{`${logStore.difficultyName} ${logStore.pathName}`}</span>
        <span className="f-italic f-thin adjacent-mar-l-2">{`"${generateTagline()}"`}</span>
      </div>
    </div>
  );
});
const taglines = [
  "Click here for the top 10 secret strats!",
  "Will there be crabsicles?",
  "It isn't over 'til Aenimus sings!",
  "Didn't have enough oranges this run.",
  "Rolled a nat 20 this run!",
  "Did it with lofi hip hop beats to relax/study to in the background.",
  "I'm very proud of this one!",
  "Found an Ultrarare in this run!",
  "YOU'RE BREATHTAKING!",
  "I think Ezandora made this happen.",
  "Did a great job by wearing a mask the entire run.",
];

function generateTagline() {
  const randomNumba = Math.floor(Math.random() * taglines.length);
  return taglines[randomNumba];
}
type NavbarButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  to?: LinkProps["to"];
};

function NavbarButton({
  className,
  disabled,
  isActive,
  onClick,
  to,
  ...otherProps
}: NavbarButtonProps) {
  const activeClassname = isActive
    ? "color-green-lighter"
    : disabled
    ? "color-grayer"
    : "color-white";

  const nonClickable = disabled || isActive;

  const componentClassName = combineClassnames(
    "pad-5 borradius-2",
    activeClassname,
    className,
    nonClickable ? "disabled-link" : undefined,
  );

  if (!to) {
    return (
      <button
        {...otherProps}
        onClick={disabled || isActive ? undefined : onClick}
        className={componentClassName}
        disabled={nonClickable}
      />
    );
  }

  return (
    <Link
      to={to}
      {...otherProps}
      onClick={disabled || isActive ? undefined : onClick}
      className={componentClassName}
    ></Link>
  );
}

type NavbarDividerProps = {
  className?: string;
};

function NavbarDivider({ className }: NavbarDividerProps) {
  return (
    <div
      className={combineClassnames(
        "pevents-none flex-row-center color-grayer adjacent-mar-l-3",
        className,
      )}
    >
      ·
    </div>
  );
}
